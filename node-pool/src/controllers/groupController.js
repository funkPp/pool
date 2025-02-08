const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getGroups = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, resources_id, name FROM groups ORDER BY id`
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
    const parentIdAuth = req.user.sub;
    // console.log(req.user.sub)
    const result = await pool.query(
      `SELECT id, resources_id, name  FROM groups WHERE id = $1 `,
      [id, parentIdAuth]
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
  const { resourcesId, name } = req.body;

  // console.log(req.body,firstName, lastName, userName);
  try {
    console.log({ firstName });
    // await checkExistGroup(userName);

    const result = await pool.query(
      `INSERT INTO groups (resources_id, name ) VALUES ($1, $2) RETURNING id, resources_id, name `,
      [resourcesId, name]
    );

    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGroup = async (req, res) => {
  const { id } = req.params;

  const { resourcesId, name } = req.body;
  const parentIdAuth = req.user.sub;
  try {
    const result = await pool.query(
      `UPDATE groups SET resourcesId = $2, name = $3 WHERE id = $1 RETURNING id, resources_id, name `,
      [id, resourcesId, name]
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
