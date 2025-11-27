require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log('MongoDB conectado com sucesso.');
    app.listen(PORT, () =>
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('Falha ao conectar no banco de dados:', err);
    process.exit(1);
  });
