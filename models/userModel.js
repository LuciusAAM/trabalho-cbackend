const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome é obrigatório"],
    minlength: [3, "O nome deve ter no mínimo 3 caracteres"],
  },
  email: {
    type: String,
    required: [true, "O e-mail é obrigatório"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Formato de e-mail inválido"],
  },
  senha: {
    type: String,
    required: [true, "A senha é obrigatória"],
    minlength: [6, "A senha deve ter no mínimo 6 caracteres"],
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

// ---- Hash ----
UserSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();

  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);

  next();
});

// ---- comparar senha ----
UserSchema.methods.compararSenha = async function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model("User", UserSchema);
