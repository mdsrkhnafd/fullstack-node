const { body } = require('express-validator');

const updateTaskValidator = [
  body("_id", "Valid document ID is required")
    .notEmpty()
    .isMongoId(),

  body("title")
    .optional()
    .isString().withMessage("Title must be a string")
    .isLength({ max: 100 }).withMessage("Title must be less than 100 characters")
    .trim(),

  body("dueDate")
    .optional()
    .isISO8601().withMessage("dueDate must be a valid date format (ISO8601)"),

  body("description")
    .optional()
    .isString().withMessage("The description must be a string")
    .isLength({ max: 500 }).withMessage("The description cannot be more than 500 characters")
    .trim(),

  body("priority")
    .optional()
    .isIn(["low", "normal", "high"]).withMessage("Priority must be one of: low, normal, high"),

  body("status")
    .optional()
    .isIn(["todo", "inProgress", "completed"]).withMessage("Status must be one of: todo, inProgress, completed"),
];

module.exports = updateTaskValidator;
