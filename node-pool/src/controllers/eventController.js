const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getEvents = async (req, res) => {
  try {
  
    const result = await pool.query(
      `SELECT id, title, start_time as start, end_time as end, resource_id, group_id FROM events ORDER BY id`
    );
    //console.log(result.rows)
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const parentIdAuth = req.user.sub;
    // console.log(req.user.sub)
    const result = await pool.query(
      `SELECT id, title, start_time as start , end_time as end, resource_id, group_id  FROM events WHERE id = $1 `,
      [id, parentIdAuth]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkExistEvent = async (name) => {
  const existEvent = await pool.query("select * from events where name = $1", [
    name,
  ]);
  // console.log(name);
  if (existEvent.rowCount) {
    throw new Error(`Событие ${name} уже есть!`);
  }
};

exports.createEvent = async (req, res) => {
  const { title, start, end, resource_id, group_id } = req.body;

  // console.log(req.body,firstName, lastName, userName);
  try {
    //console.log({ firstName });
    // await checkExistEvent(userName);

    const result = await pool.query(
      `INSERT INTO events (title, start_time, end_time, resource_id, group_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, start_time as start, end_time as end, resource_id, group_id `,
      [title, start, end, resource_id, group_id]
    );
    console.log(result)
    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;

  const {title, start, end, resource_id, group_id } = req.body;
  const parentIdAuth = req.user.sub;
  try {
    console.log(id, title, start, end, resource_id, group_id)
    const result = await pool.query(
      `UPDATE events SET title = $2, start_time = $3, end_time = $4, resource_id = $5, group_id = $6 WHERE id = $1 RETURNING id, title, start_time as start, end_time as end, resource_id, group_id `,
      [id, title, start, end, resource_id, group_id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  const parentIdAuth = req.user.sub;
  try {
    await pool.query("DELETE FROM events WHERE id = $1 ", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
