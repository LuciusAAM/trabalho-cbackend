const { body, param } = require('express-validator');

exports.registerValidator = [
  body('name').isString().isLength({ min: 2 }).withMessage('Name must have at least 2 characters'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('password')
    .isString()
    .isLength({ min: 6 })
    .withMessage('Password must have at least 6 characters'),
];

exports.loginValidator = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').exists().withMessage('Password is required'),
];

exports.userIdParam = [param('id').isMongoId().withMessage('Invalid user id')];
