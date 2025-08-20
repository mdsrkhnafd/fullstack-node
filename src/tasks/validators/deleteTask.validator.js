const { body } = require('express-validator');

const deleteTaskValidator = [
  body("_id", "Valid document ID is required")
    .notEmpty()
    .isMongoId(),
];

module.exports = deleteTaskValidator;
