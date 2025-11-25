const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/userModel");

const MONGO_TEST_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/express_api_test_db";

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await User.deleteMany();
});

test("register -> login -> get user", async () => {
  const registerRes = await request(app).post("/api/v1/users/register").send({
    name: "Test User",
    email: "test@example.com",
    password: "123456",
  });
  expect(registerRes.statusCode).toBe(201);

  const loginRes = await request(app).post("/api/v1/users/login").send({
    email: "test@example.com",
    password: "123456",
  });
  expect(loginRes.statusCode).toBe(200);
  expect(loginRes.body.token).toBeDefined();

  const token = loginRes.body.token;
  const usersRes = await request(app)
    .get("/api/v1/users")
    .set("Authorization", "Bearer {token}");
  expect(usersRes.statusCode).toBe(200);
  expect(Array.isArray(usersRes.body)).toBe(true);
});
