const { body } = require("express-validator");

const createTaskValidator = [
  body("title")
    .notEmpty().withMessage("The title cannot be empty")
    .isString().withMessage("The title must be a string")
    .isLength({ max: 100 }).withMessage("The title must be less than 100 characters")
    .trim(),

  body("dueDate")
    .notEmpty().withMessage("dueDate is required")
    .isISO8601().withMessage("dueDate must be a valid date format (ISO8601)"),

  body("description")
    .notEmpty().withMessage("The description cannot be empty")
    .isString().withMessage("The description must be a string")
    .isLength({ max: 500 }).withMessage("The description cannot be more than 500 characters")
    .trim(),

  body("priority")
    .isIn(["low", "normal", "high"]).withMessage("Priority must be one of: low, normal, high"),

  body("status")
    .isIn(["todo", "inProgress", "completed"]).withMessage("Status must be one of: todo, inProgress, completed"),
];

module.exports = createTaskValidator;
