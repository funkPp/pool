const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getStudents = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, firstname as "firstName", lastname as "lastName", parent_id, birthday, gender FROM students ORDER BY id`
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
    const parentIdAuth  = req.user.sub;
    // console.log(req.user.sub)
    const result = await pool.query(
      `SELECT id, firstname as "firstName", lastname as "lastName", parent_id, birthday, gender FROM students WHERE id = $1 and parent_id = $2 `,
      [id, parentIdAuth]
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
      `SELECT id, firstname as "firstName", lastname as "lastName", parent_id, birthday, gender FROM students WHERE parent_id = $1 order by id`,
      [parent]
    );
    // console.log(result.rows)
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentsByGroup = async (req, res) => {
  try {
    const { id: groupId } = req.params;
    // console.log(groupId)
    const result = await pool.query(
     `select s.*
      from lnk_students_groups sg inner join students s on
	      s.id = sg.student_id inner join groups g on
	      g.id = sg.group_id
      where sg.group_id = $1 order by id`,
      [groupId]
    );
     //console.log(result.rows)
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getStudentsByName = async (req, res) => {
  try {
    const { name } = req.params;
    //console.log(name)
    const result = await pool.query(
     `select *
      from students
      where lastname ||' '|| firstname  ilike $1`,
      [`%${name}%`]
    );
     console.log({name})
    res.status(200).json(result.rows);
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
  const { firstName, lastName, parent_id, birthday, gender } = req.body;

  // console.log(req.body,firstName, lastName, userName);
  try {
    console.log({ firstName });
    // await checkExistStudent(userName);

    const result = await pool.query(
      `INSERT INTO students (firstName, lastName, parent_id, birthday, gender) VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname as "firstName", lastname as "lastName", parent_id, birthday, gender`,
      [firstName, lastName, parent_id, birthday, gender]
    );

    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, parent_id, birthday, gender } = req.body;
  const parentIdAuth  = req.user.sub;
  try {
    const result = await pool.query(
      `UPDATE students SET firstName = $2, lastName = $3, parent_id= $4, birthday = $5, gender =$6 WHERE id = $1 and parent_id = $7 RETURNING id, firstname as "firstName", lastname as "lastName", parent_id, birthday, gender`,
      [id, firstName, lastName, parent_id, birthday, gender, parentIdAuth]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  const parentIdAuth  = req.user.sub;
  try {
    await pool.query("DELETE FROM students WHERE id = $1 and parent_id = $2", [id, parentIdAuth]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
