const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Usuario = require("../models/userModel");

const request = supertest(app);

const MONGO_TEST_URI =
  process.env.MONGO_TEST_URI ||
  "mongodb://127.0.0.1:27017/express_api_test_db";

let usuarioId = "";
let token = "";

// Conexão antes dos testes
beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);
});

// Limpa dados após cada teste
afterEach(async () => {
  await Usuario.deleteMany();
});

// Fecha conexão após TODOS os testes
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("Testes do recurso /api/v1/users", () => {
  
  test("POST /registrar deve criar usuário", async () => {
    const res = await request
      .post("/api/v1/users/registrar")
      .send({
        nome: "Usuário Teste",
        email: "teste@example.com",
        senha: "123456"
      });

    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe("teste@example.com");

    usuarioId = res.body.id;
  });

  test("POST /registrar sem body deve retornar 400 (validação)", async () => {
    const res = await request.post("/api/v1/users/registrar");

    expect(res.status).toBe(400);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("errors");
  });

  test("POST /registrar com e-mail já existente deve retornar 409", async () => {
    await Usuario.create({
      nome: "Teste",
      email: "teste@example.com",
      senha: "123456"
    });

    const res = await request.post("/api/v1/users/registrar").send({
      nome: "Outro Usuário",
      email: "teste@example.com",
      senha: "123456"
    });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("E-mail já registrado");
  });

  test("POST /login deve retornar token", async () => {
    // Cria usuário antes de logar
    await Usuario.create({
      nome: "Login User",
      email: "login@example.com",
      senha: "123456"
    });

    const res = await request.post("/api/v1/users/login").send({
      email: "login@example.com",
      senha: "123456"
    });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("token");

    token = res.body.token;
  });

  test("POST /login inválido deve retornar 401", async () => {
    const res = await request.post("/api/v1/users/login").send({
      email: "naoexiste@example.com",
      senha: "errado"
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Credenciais inválidas");
  });

  test("GET / deve retornar lista de usuários", async () => {
    await Usuario.create({
      nome: "User1",
      email: "user1@example.com",
      senha: "123456"
    });

    const res = await request.get("/api/v1/users");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  test("GET /:id com id válido deve retornar usuário", async () => {
    const user = await Usuario.create({
      nome: "User123",
      email: "user123@example.com",
      senha: "123456"
    });

    const res = await request.get(`/api/v1/users/${user._id}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("user123@example.com");
  });

  test("PUT /:id deve atualizar o usuário (com token)", async () => {
    const user = await Usuario.create({
      nome: "Update User",
      email: "update@example.com",
      senha: "123456"
    });

    // gerar token válido
    const login = await request.post("/api/v1/users/login").send({
      email: "update@example.com",
      senha: "123456"
    });

    const res = await request
      .put(`/api/v1/users/${user._id}`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({ nome: "Atualizado" });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Atualizado");
  });

  test("DELETE /:id com token válido deve remover usuário", async () => {
    const user = await Usuario.create({
      nome: "Delete User",
      email: "del@example.com",
      senha: "123456"
    });

    const login = await request.post("/api/v1/users/login").send({
      email: "del@example.com",
      senha: "123456"
    });

    const res = await request
      .delete(`/api/v1/users/${user._id}`)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).toBe(204);
  });

  test("DELETE /:id sem token deve retornar 401", async () => {
    const user = await Usuario.create({
      nome: "Delete User 2",
      email: "del2@example.com",
      senha: "123456"
    });

    const res = await request.delete(`/api/v1/users/${user._id}`);

    expect(res.status).toBe(401);
  });
});
