const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, firstName, lastName, username, role FROM users ORDER BY id"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT id, firstName, lastName, username, role FROM users WHERE id = $1",
      [id]
    );
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
  console.log(username)
  if (existUser.rowCount) {
    throw new Error(`Пользователь ${username} уже зарегистрирован!`);
  }
};

exports.createUser = async (req, res) => {
  const {
    firstName,
    lastName ,
    userName,
    password,
    role
  } = req.body;
  let userHash = await bcrypt.hash(password, 16);
  console.log(req.body,firstName, lastName, userName, password);
  try {
    await checkExistUser(userName);

    const result = await pool.query(
      "INSERT INTO users (firstName, lastName, username, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, firstName, lastName, username, role",
      [firstName, lastName, userName, role, userHash]
    );

    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const {
    firstname: firstName,
    lastname: lastName,
    username: userName,
    role,
    password,
  } = req.body;

  try {
    let userHash;
    let result;
    if (password) {
      userHash = await bcrypt.hash(password, 16);
      // console.log(password, userHash);
      result = await pool.query(
        "UPDATE users SET firstname = $2, lastname = $3, username = $4, password = $5, role = $6 WHERE id = $1 RETURNING id, firstname, lastname, username, role",
        [id, firstName, lastName, userName, userHash, role]
      );
    } else {
      result = await pool.query(
        "UPDATE users SET firstname = $2, lastname = $3, username = $4, role = $5 WHERE id = $1 RETURNING id, firstname, lastname, username, role",
        [id, firstName, lastName, userName, role]
      );
    }
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
