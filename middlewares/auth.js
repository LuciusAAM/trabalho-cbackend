const jwt = require('jsonwebtoken');

exports.required = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Cabeçalho de autorização não enviado' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ mensagem: 'Formato de autorização inválido' });
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = payload; // padronização em PT-BR
    return next();
  } catch (err) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
};

// Middleware opcional: adiciona req.usuario se houver token
exports.optional = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next();

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next();
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
  } catch (err) {
    // token inválido é ignorado quando o login é opcional
  }

  return next();
};
