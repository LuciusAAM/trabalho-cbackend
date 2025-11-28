const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
        minlength: 6
    }
});

// Executa ANTES de salvar o usuário
UserSchema.pre('save', async function (next) {
    // Se a senha não foi modificada, segue direto
    if (!this.isModified('senha')) {
        return next();
    }

    // Gera o hash da senha
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

// Método para comparar senha no login
UserSchema.methods.comparePassword = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model("User", UserSchema);
