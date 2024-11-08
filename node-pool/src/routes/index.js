const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/AuthController");

router.post("/users/authenticate", authController.authenticate);
router.get("/users", authController.authorize(), userController.getUsers);
router.get("/users/:id", authController.authorize(), userController.getUser);
router.post("/users/register", userController.createUser);
router.put("/users/:id", authController.authorize(), userController.updateUser);
router.delete("/users/:id", authController.authorize(), userController.deleteUser);


module.exports = router;
