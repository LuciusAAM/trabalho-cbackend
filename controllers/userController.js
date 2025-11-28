const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");


const gerarToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

exports.registrar = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha } = req.body;

    const existente = await User.findOne({ email });
    if (existente) {
      return res.status(409).json({ message: "E-mail já registrado" });
    }

    const hash = await bcrypt.hash(senha, 10);
    const usuario = await User.create({ nome, email, senha: hash });

    return res.status(201).json({
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const confere = await bcrypt.compare(senha, usuario.senha);
    if (!confere) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = gerarToken(usuario);

    return res.status(200).json({
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
  } catch (err) {
    next(err);
  }
};

exports.listarTodos = async (req, res, next) => {
  try {
    const usuarios = await User.find().select("-senha");
    return res.status(200).json(usuarios);
  } catch (err) {
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const usuario = await User.findById(req.params.id).select("-senha");

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const data = { ...req.body };

    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }

    const usuario = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    }).select("-senha");

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
};

exports.remover = async (req, res, next) => {
  try {
    const usuario = await User.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};


