const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/userController");
const {
  registrarValidator,
  loginValidator,
  usuarioIdParam,
  atualizarValidator,
} = require("../validators/userValidator");

const auth = require("../middlewares/auth");

router.post("/registrar", registrarValidator, usuarioController.registrar);
router.post("/login", loginValidator, usuarioController.login);

router.get("/", auth.optional, usuarioController.listarTodos);
router.get(
  "/:id",
  usuarioIdParam,
  auth.optional,
  usuarioController.buscarPorId
);

router.put(
  "/:id",
  usuarioIdParam,
  auth.required,
  atualizarValidator,
  usuarioController.atualizar
);
router.patch(
  "/:id",
  usuarioIdParam,
  auth.required,
  atualizarValidator,
  usuarioController.atualizar
);

router.delete("/:id", usuarioIdParam, auth.required, usuarioController.remover);

module.exports = router;
