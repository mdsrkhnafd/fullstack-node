const {body} = require("express-validator");

const loginValidator = [
    body('email')
        .isEmail().withMessage('Invalid email format')
        .notEmpty().withMessage('Email is required')
        .trim(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isString().withMessage('Password must be a string')
];

module.exports = loginValidator;