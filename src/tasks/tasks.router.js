const express = require("express");
const { validationResult } = require("express-validator");
const tasksController = require("./tasks.controller.js");
const createTaskValidator = require("./validators/createTask.validator.js");
const { StatusCodes } = require("http-status-codes");
const getTaskValidator = require("./validators/getTask.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validator.js");
const authenticateToken = require("../middleware/authenticateToken.middleware.js");

const tasksRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of tasks needed in a single response
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number of the tasks response
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: asc
 *           enum: [asc, desc]
 *         description: The order of the tasks response
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               statusCode: 200
 *               message: Ok
 *               data:
 *                 - _id: "63b3c6d1c3b3b3b3b3b3b3b3"
 *                   title: New Task 1
 *                   description: This is a new task to be added.
 *                   status: todo
 *                   priority: normal
 *                   dueDate: "2025-01-01T12:00:00Z"
 *       401:
 *         description: Not Authorized Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               statusCode: 401
 *               message: Unauthorized
 *               error:
 *                 message: You are not authorized to perform this request.
 *       403:
 *         description: Forbidden Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               statusCode: 403
 *               message: Forbidden
 *               error:
 *                 message: Please login again, invalid token.
 */


tasksRouter.get("/tasks", [getTaskValidator , authenticateToken], (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return tasksController.handleGetTasks(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               statusCode: 201
 *               message: Created
 *               data:
 *                 _id: "63b3c6d1c3b3b3b3b3b3b3b3"
 *                 title: New Task 1
 *                 description: This is a new task to be added.
 *                 status: todo
 *                 priority: normal
 *                 dueDate: "2025-01-01T12:00:00Z"
 *       401:
 *         description: Not Authorized Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               statusCode: 401
 *               message: Unauthorized
 *               error:
 *                 message: You are not authorized to perform this request.
 *       403:
 *         description: Forbidden Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               statusCode: 403
 *               message: Forbidden
 *               error:
 *                 message: Please login again, invalid token.
 */


tasksRouter.post("/tasks", [createTaskValidator , authenticateToken], (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return tasksController.handlePostTasks(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   patch:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               statusCode: 200
 *               message: Ok
 *               data:
 *                 _id: "63b3c6d1c3b3b3b3b3b3b3b3"
 *                 title: New Task 1
 *                 description: This is a new task to be added.
 *                 status: todo
 *                 priority: normal
 *                 dueDate: "2025-01-01T12:00:00Z"
 *       401:
 *         description: Not Authorized Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               statusCode: 401
 *               message: Unauthorized
 *               error:
 *                 message: You are not authorized to perform this request.
 *       403:
 *         description: Forbidden Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               statusCode: 403
 *               message: Forbidden
 *               error:
 *                 message: Please login again, invalid token.
 */


tasksRouter.patch("/tasks", [updateTaskValidator , authenticateToken], (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return tasksController.handlePatchTasks(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskDelete'
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               statusCode: 200
 *               message: Ok
 *               data:
 *                 acknowledged: true
 *                 deletedCount: 1
 *       401:
 *         description: Not Authorized Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               statusCode: 401
 *               message: Unauthorized
 *               error:
 *                 message: You are not authorized to perform this request.
 *       403:
 *         description: Forbidden Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               statusCode: 403
 *               message: Forbidden
 *               error:
 *                 message: Please login again, invalid token.
 */


tasksRouter.delete("/tasks", [deleteTaskValidator , authenticateToken], (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return tasksController.handleDeleteTasks(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = tasksRouter;
