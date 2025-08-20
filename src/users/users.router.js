const express = require('express');
const usersController = require('./users.controller');
const createUserValidator = require('./validators/createUser.validator');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');


const usersRouter = express.Router();

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               statusCode: 201
 *               message: Created
 *               data:
 *                 _id: "63b3c6d1c3b3b3b3b3b3b3b3"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 email: "john@me.com"
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



usersRouter.post('/create' , createUserValidator ,  (req, res) => {
  const result  = validationResult(req);
  
  if(result.isEmpty()) {
    return usersController.handleCreateUser(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});


module.exports = usersRouter;