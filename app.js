const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const userRoutes = require('./routes/userRoutes.js');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Versionamento: /api/v1
app.use('/api/v1/users', userRoutes);

// Swagger UI
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota de status da API
app.get('/status', (req, res) => res.status(200).json({ status: 'ok' }));

// Error handler
app.use(errorHandler);

module.exports = app;
