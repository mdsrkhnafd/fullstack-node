const { query } = require('express-validator');

const getTaskValidator = [
  query('limit', 'Limit must be a valid integer').optional().isInt().toInt({min: 1}),
  query('limit').customSanitizer((value , {req}) => {
    return value ? value : 5; // Default limit to 10 if not provided
  }),
  query('page', 'Page must be a valid integer').optional().isInt().toInt({min: 1}),
  query('page').customSanitizer((value, {req}) => {
    return value ? value : 1; // Default page to 1 if not provided
  }),
  query('order', "Order must be one of ['asc', 'desc']").optional().isIn(['asc', 'desc']),
  query('order').customSanitizer((value, {req}) => {
    return value ? value : 'asc'; // Default order to 'asc' if not provided
  }),
];

module.exports = getTaskValidator;
