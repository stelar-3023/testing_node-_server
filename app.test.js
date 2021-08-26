import request from "supertest";
import makeApp from "./app.js";
import { jest } from "@jest/globals";

const createUser = jest.fn();
const getUser = jest.fn();

const app = makeApp({
  createUser,
  getUser,
});

describe("POST /users", () => {
  beforeEach(() => {
    createUser.mockReset();
    createUser.mockResolvedValue(0);
  });

  describe("given a username and password", () => {
    // should save the username and password to the database
    test("should save the username and password to the database", async () => {
      const bodyData = [
        { username: "username1", password: "password1" },
        { username: "username2", password: "password2" },
        { username: "username3", password: "password3" },
      ];
      for (const body of bodyData) {
        // reset the mock functions
        createUser.mockReset();
        await request(app).post("/users").send(body);
        expect(createUser.mock.calls.length).toBe(1);
        expect(createUser.mock.calls[0][0]).toBe(body.username);
        expect(createUser.mock.calls[0][1]).toBe(body.password);
      }
    });
    // should respond with a json object containing the user id
    test("should respond with a json object containg the user id", async () => {
      for (let i = 0; i < 10; i++) {
        createUser.mockReset();
        createUser.mockResolvedValue(i);
        const response = await request(app)
          .post("/users")
          .send({ username: "username", password: "password" });
         expect(response.body.userId).toBe(i);
      }
    });
    // should resppnd with a 200 status code
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });
    // should specify json in the content type header
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    // should respond with a json object containing the user id
    test("response has userId", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.body.userId).toBeDefined();
    });
  });

  describe("when the username and password is missing", () => {
    // should respond with a 400 status code
    test("should respond with a status code of 400", async () => {
      const bodyData = [{ username: "username" }, { password: "password" }, {}];
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
// NODE_OPTIONS=--experimental-vm-modules npx jest --collect-coverage

