const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, firstName, lastName, username FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const {id} = req.params
    const result = await pool.query("SELECT id, firstName, lastName, username FROM users WHERE id = $1", [id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkExistUser = async (username) => {
  const existUser = await pool.query(
    "select * from users where username = $1",
    [username]
  );
  if (existUser.rowCount) {
    throw new Error(`Пользователь ${username} уже зарегистрирован!`);
  }
}

exports.createUser = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  let userHash = await bcrypt.hash(password, 16);
  try {
    await checkExistUser(username)

    const result = await pool.query(
      "INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4) RETURNING id, firstName, lastName, username, ",
      [firstName, lastName, username, userHash]
    );
    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, username, password } = req.body;
  let userHash = await bcrypt.hash(password, 16);
  try {
    const result = await pool.query(
      "UPDATE users SET firstName = $1, lastName = $2, username = $3 WHERE id = $4 RETURNING id, firstName, lastName, lastName",
      [firstName, lastName, username, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
