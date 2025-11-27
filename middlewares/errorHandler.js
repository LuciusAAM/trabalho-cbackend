module.exports = (err, req, res, next) => {
  console.error("Erro interno:", err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;
  const mensagem = err.message || "Erro interno no servidor";

  return res.status(status).json({ mensagem });
};
