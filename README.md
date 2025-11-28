🚀 Projeto – API Node.js + Express + MongoDB (Atlas)

Este projeto é uma API RESTful construída com Node.js, Express, MongoDB Atlas e Mongoose, com autenticação JWT e documentação via Swagger UI.
O objetivo é servir como base didática para estudos de backend.

👥 Integrantes do Grupo
Lucius Alves de Assis Marques - 2324290093 - Responsável pelo direcionamento, como Routes server e validators, também na correção des testes
Caio Víctor de Almeida Aleixo - 2324290077 - Criação dos testes e auxiliação na correção
Diego Rodrigues Alves - 2324290066 - Criação dos middlewares, controllers e models, auxílo na produção de tests


📦 Tecnologias Utilizadas

Node.js

Express

Mongoose

MongoDB Atlas

JWT

bcrypt

Swagger UI

dotenv

Nodemon

📁 Estrutura do Projeto
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── swagger/
│   └── swagger.json
├── server.js
├── package.json
├── .env.example

🛠️ Instalação e Execução
1️⃣ Clonar o projeto
git clone https://github.com/LuciusAAM/trabalho-cbackend.git


2️⃣ Instalar dependências
npm install express mongoose bcrypt jsonwebtoken express-validator cors dotenv
npm install --save-dev jest supertest nodemon
npm install swagger-ui-express yamljs


🔧 Configuração do Ambiente

Crie um arquivo .env na raiz do projeto.
Use o .env.example como base:

# ===== MONGODB =====
MONGODB_USER=
MONGODB_PSWD=
MONGODB_HOST=
MONGO_URI=

# ===== JWT =====
JWT_SECRET=
JWT_EXPIRES=


3️⃣ Configurar MongoDB Atlas

Criar cluster free

Criar usuário para o banco

Liberar acesso para o IP atual ou 0.0.0.0/0

Montar a URI:

MONGO_URI=mongodb+srv://USER:SENHA@HOST/trabalhodb?retryWrites=true&w=majority



▶️ Rodar o servidor

Modo desenvolvimento:

npm run dev


▶️ Para rodar os tests:

npm test


📚 Documentação da API

Acesse:

👉 http://localhost:3000/api-docs

📌 Exemplos de Uso (Requests)
🔐 Login

POST /auth/login

{
  "email": "teste@teste.com",
  "senha": "123456"
}

👤 Criar usuário

POST /auth/register

{
  "nome": "João",
  "email": "joao@email.com",
  "senha": "123456"
}

🔒 Buscar usuários (rota protegida)

GET /usuarios

Header:

Authorization: Bearer SEU_TOKEN_AQUI







📄 Licença

Uso livre para fins educacionais.