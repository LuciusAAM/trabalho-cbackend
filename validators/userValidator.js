const { body, param } = require("express-validator");

exports.registrarValidator = [
  body("nome")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("O nome deve ter no mínimo 3 caracteres"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("E-mail inválido"),

  body("senha")
    .isString()
    .isLength({ min: 6 })
    .withMessage("A senha deve ter no mínimo 6 caracteres"),
];

exports.loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("E-mail inválido"),

  body("senha")
    .isString()
    .notEmpty()
    .withMessage("A senha é obrigatória"),
];

exports.atualizarValidator = [
  body("nome")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("O nome deve ter no mínimo 3 caracteres"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("E-mail inválido"),

  body("senha")
    .optional()
    .isString()
    .isLength({ min: 6 })
    .withMessage("A senha deve ter no mínimo 6 caracteres"),
];

exports.usuarioIdParam = [
  param("id")
    .isMongoId()
    .withMessage("ID de usuário inválido"),
];
