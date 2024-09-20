/*
This test uses jest and supertest. 
1. Use the following command to install:
npm install --save-dev jest supertest
2. Run the test script using the command:
npx jest test/user-login.test.js
*/

require("dotenv").config();
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("../routers/user-router");
const { User } = require("../models/user-model");
const app = require("../app.js");
const generateJWT = require("../helpers/jwt-helper");

describe("POST /api/user/add", () => {
let token;

beforeAll(async () => {
try {
await mongoose.connect(process.env.MONGO_TEST_URI);
const testUser = new User({
userName: "adminUser",
email: "admin@example.com",
password: "password123",
role: "admin",
personalDetails: {
firstName: "Admin",
lastName: "User",
birthday: "1980-01-01",
phone: "1234567890",
address: "456 Admin St",
city: "Admin City",
state: "Admin State",
country: "Admin Country",
zipCode: 12345,
},
createdBy: new mongoose.Types.ObjectId(), // Assuming createdBy is required
});
await testUser.save();
token = generateJWT(testUser._id, testUser.role);
} catch (error) {
console.error(`Error configuring user-add test suites: ${error}`);
}
});

afterAll(async () => {
await User.deleteMany({});
await mongoose.connection.close();
});

it("should add a new admin user", async () => {
const newUser = {
userName: "newAdmin",
email: "newadmin@example.com",
password: "password123",
role: "admin",
personalDetails: {
firstName: "New",
lastName: "Admin",
birthday: "1990-01-01",
phone: "1234567890",
address: "123 Admin St",
city: "Admin City",
state: "Admin State",
country: "Admin Country",
zipCode: 12345,
},
};

const response = await request(app)
.post("/api/user/add")
.set("Authorization", `Bearer ${token}`)
.send(newUser);

expect(response.status).toBe(201);
expect(response.body.msg).toContain("New admin saved");
});

it("should return validation error for missing user details", async () => {
const response = await request(app)
.post("/api/user/add")
.set("Authorization", `Bearer ${token}`)
.send({});

expect(response.status).toBe(400);
expect(response.body.msg).toContain("Missing required field: userName");
});

it("should return error for duplicate email", async () => {
const newUser = {
userName: "duplicateAdmin",
email: "newadmin@example.com", // This email already exists
password: "password123",
role: "admin",
personalDetails: {
firstName: "Duplicate",
lastName: "Admin",
birthday: "1990-01-01",
phone: "1234567890",
address: "123 Duplicate St",
city: "Duplicate City",
state: "Duplicate State",
country: "Duplicate Country",
zipCode: 12345,
},
};

const response = await request(app)
.post("/api/user/add")
.set("Authorization", `Bearer ${token}`)
.send(newUser);

expect(response.status).toBe(400);
expect(response.body.msg).toContain("Username or email already exists");
});

it("should return error for invalid role", async () => {
const newUser = {
userName: "invalidRoleUser",
email: "invalidrole@example.com",
password: "password123",
role: "invalidRole", // Invalid role
personalDetails: {
firstName: "Invalid",
lastName: "Role",
birthday: "1990-01-01",
phone: "1234567890",
address: "123 Invalid St",
city: "Invalid City",
state: "Invalid State",
country: "Invalid Country",
zipCode: 12345,
},
createdBy: token,
};

const response = await request(app)
.post("/api/user/add")
.set("Authorization", `Bearer ${token}`)
.send(newUser);

expect(response.status).toBe(400);
expect(response.body.msg).toContain("Invalid role: invalidRole");
});

it("should return server error on unexpected issues", async () => {
jest.spyOn(User, 'findOne').mockImplementation(() => {
throw new Error("Unexpected server error");
});

const newUser = {
userName: "serverErrorUser",
email: "servererror@example.com",
password: "password123",
role: "admin",
personalDetails: {
firstName: "Server",
lastName: "Error",
birthday: "1990-01-01",
phone: "1234567890",
address: "123 Server St",
city: "Server City",
state: "Server State",
country: "Server Country",
zipCode: 12345,
},
};

const response = await request(app)
.post("/api/user/add")
.set("Authorization", `Bearer ${token}`)
.send(newUser);

expect(response.status).toBe(500);
expect(response.body.msg).toContain("Error saving user: Unexpected server error");
});
});
