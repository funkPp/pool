const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getStudents = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, firstname as "firstName", lastname as "lastName", parent_id, birthday FROM students ORDER BY id`
    );
    //console.log(result.rows)
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id, firstname as "firstName", lastname as "lastName", parent_id, birthday FROM students WHERE id = $1`,
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getStudentByParent = async (req, res) => {
  try {
    const { parent } = req.params;
    const result = await pool.query(
      `SELECT id, firstname as "firstName", lastname as "lastName", parent_id, birthday FROM students WHERE parent_id = $1`,
      [parent]
    );
    console.log(result.rows[0])
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// const checkExistStudent = async (userName) => {
//   const existStudent = await pool.query(
//     "select * from students where userName = $1",
//     [userName]
//   );
//   console.log(userName);
//   if (existStudent.rowCount) {
//     throw new Error(`Пользователь ${userName} уже зарегистрирован!`);
//   }
// };

exports.createStudent = async (req, res) => {
  const { firstName, lastName, parent, birthday } = req.body;

  // console.log(req.body,firstName, lastName, userName);
  try {
    console.log({ firstName });
    // await checkExistStudent(userName);

    const result = await pool.query(
      `INSERT INTO students (firstName, lastName, parent_id, birthday) VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname as "firstName", lastname as "lastName", parent_id, birthday`,
      [firstName, lastName, parent, birthday]
    );

    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;

  const {
    firstName,
    lastName,
    parent,
    birthday
  } = req.body;

  try {
    const result = await pool.query(
        `UPDATE students SET firstName = $2, lastName = $3, parent_id= $4, birthday = $5 WHERE id = $1 RETURNING id, firstname as "firstName", lastname as "lastName", parent_id, birthday`,
        [id, firstName, lastName, parent, birthday]
      );
   
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM students WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
