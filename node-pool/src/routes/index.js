const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/AuthController");
const studentController = require("../controllers/studentController");

router.post("/users/authenticate", authController.authenticate);

router.get("/users", authController.authorize(), userController.getUsers);
router.get("/users/:id", authController.authorize(), userController.getUser);
router.post("/users/register", userController.createUser);
router.put("/users/:id", authController.authorize(), userController.updateUser);
router.delete("/users/:id", authController.authorize(), userController.deleteUser);

router.get("/students", authController.authorize(), studentController.getStudents);
router.get("/students/:id", authController.authorize(), studentController.getStudentById);
router.get("/students/parent/:parent", authController.authorize(), studentController.getStudentByParent);
router.post("/students/create", authController.authorize(), studentController.createStudent);
router.put("/students/:id", authController.authorize(), studentController.updateStudent);
router.delete("/students/:id", authController.authorize(), studentController.deleteStudent);



module.exports = router;
