const { body } = require("express-validator");

const createUserValidator = [
  body("firstName")
    .notEmpty().withMessage("First name is required")
    .isString().withMessage("First name must be a string")
    .isLength({ max: 50 }).withMessage("First name must be at most 50 characters")
    .trim(),

  body("lastName")
    .optional()
    .isString().withMessage("Last name must be a string")
    .isLength({ max: 50 })
    .trim(),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email must be valid email format")
    .isLength({max: 100})
    .trim(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@, $, !, %, *, ?, &)"),
];

module.exports = createUserValidator;
