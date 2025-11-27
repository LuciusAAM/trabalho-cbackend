const { body, param } = require("express-validator");

exports.registrarValidator = [
  body("nome")
    .isString()
    .isLength({ min: 3 })
    .withMessage("O nome deve ter no mínimo 3 caracteres"),

  body("email")
    .isEmail()
    .withMessage("E-mail inválido"),

  body("senha")
    .isString()
    .isLength({ min: 6 })
    .withMessage("A senha deve ter no mínimo 6 caracteres"),
];

exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage("E-mail inválido"),

  body("senha")
    .exists()
    .withMessage("A senha é obrigatória"),
];

exports.atualizarValidator = [
  body("nome")
    .optional()
    .isLength({ min: 3 })
    .withMessage("O nome deve ter no mínimo 3 caracteres"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("E-mail inválido"),

  body("senha")
    .optional()
    .isLength({ min: 6 })
    .withMessage("A senha deve ter no mínimo 6 caracteres"),
];

exports.usuarioIdParam = [
  param("id")
    .isMongoId()
    .withMessage("ID de usuário inválido"),
];
