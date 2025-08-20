const express = require("express");
const authController = require("./auth.controller.js");
const authRouter = express.Router();
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const loginValidator = require("../auth/validators/login.validator.js");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               statusCode: 200
 *               message: Ok
 *               data:
 *                 accessToken: "eVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                 firstName: "Mark"
 *                 lastName: "Jhon"
 *                 email: "doe@me.com"
 *
 */

authRouter.post("/login", loginValidator, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return authController.handleLogin(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: A valid email address
 *           format: email
 *         password:
 *           type: string
 *           description: Password must be 8 characters and also a number, a capital letter and a special character
 *       example:
 *         email: "mark@doe.com"
 *         password: "Test1234@"
 */
