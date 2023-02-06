const express = require("express");
const createTaskController = require("../controllers/create-task-controller");
const refreshTokenController = require("../controllers/refresh-token-controller");
const deleteTaskController = require("../controllers/delete-task-controller");
const deleteUserController = require("../controllers/delete-user-controller");
const getTaskController = require("../controllers/get-task-controller");
const getTasksController = require("../controllers/get-tasks-controller");
const getUserController = require("../controllers/get-user-controller");
const getUsersController = require("../controllers/get-users-controller");
const loginController = require("../controllers/login-controller");
const logoutController = require("../controllers/logout-controller");
const registerController = require("../controllers/register-controller");
const updateTaskController = require("../controllers/update-task-controller");
const updateUserController = require("../controllers/update-user-controller");
const verifyAccessToken = require("../middlewares/verify-access-token");
const router = express.Router();

// * Authentication
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/token", refreshTokenController);
router.post("/logout", verifyAccessToken, logoutController);

// * User management (for ADMIN) -> do it late
// router.get("/users", getUsersController);
// router.get("/user/:id", getUserController);
// router.patch("/user/:id", updateUserController);
// router.delete("/user/:id", deleteUserController);

// * User management (for USER)
router.get("/get-info", verifyAccessToken, getUserController);
router.patch("/update-info", verifyAccessToken, updateUserController);

// * Task management
router.post("/task", verifyAccessToken, createTaskController);
router.get("/tasks", verifyAccessToken, getTasksController);
router.get("/task/:id", verifyAccessToken, getTaskController);
router.patch("/task/:id", verifyAccessToken, updateTaskController);
router.delete("/task/:id", verifyAccessToken, deleteTaskController);

module.exports = router;
