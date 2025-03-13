const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getGroups = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name FROM groups ORDER BY id`
    );
    //console.log(result.rows)
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, name  FROM groups WHERE id = $1 `,
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkExistGroup = async (name) => {
  const existGroup = await pool.query("select * from groups where name = $1", [
    name,
  ]);
  // console.log(name);
  if (existGroup.rowCount) {
    throw new Error(`Группа ${name} уже есть!`);
  }
};

exports.createGroup = async (req, res) => {
  const { name } = req.body;

  // console.log(req.body,firstName, lastName, userName);
  try {
    await checkExistGroup(name);

    const result = await pool.query(
      `INSERT INTO groups ( name ) VALUES ($1) RETURNING id, name `,
      [ name]
    );

    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGroup = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;
  const parentIdAuth = req.user.sub;
  try {
    const result = await pool.query(
      `UPDATE groups SET name = $2 WHERE id = $1 RETURNING id, name `,
      [id, name]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGroup = async (req, res) => {
  const { id } = req.params;
  const parentIdAuth = req.user.sub;
  try {
    await pool.query("DELETE FROM groups WHERE id = $1 ", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
