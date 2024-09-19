/*
This test uses jest and supertest. 
1. Use the following command to install:
npm install --save-dev jest supertest
2. Run the test script using the command:
npx jest test/user-login.test.js
*/

require("dotenv").config(); 
const request = require("supertest");
const app = require("../app"); 
const mongoose = require("mongoose");
const { User } = require("../models/user-model");

describe('POST /user/login', () => {
beforeAll(async () => {
await mongoose.connect(process.env.MONGO_URI);
const studentUser = new User({
userName: 'testuser',
email: 'testuser@example.com',
password: 'password123',
role: 'student',
personalDetails: {
firstName: 'Test',
lastName: 'User',
birthday: '1998-01-01',
phone: '1234567890',
address: '123 Test Street',
city: 'Test City',
state: 'Test State',
country: 'Test Country',
zipCode: 12345,
},
createdBy: new mongoose.Types.ObjectId(), // Correctly creating ObjectId instance
});
await studentUser.save();
});

afterAll(async () => {
await User.deleteMany({ userName: 'testuser' });
await mongoose.disconnect();
});

it('should login successfully with valid credentials', async () => {
const response = await request(app)
.post('/api/user/login')
.send({
userIdentity: 'testuser',
password: 'password123',
});
expect(response.status).toBe(200);
expect(response.body.error).toBe(false);
expect(response.body.data).toHaveProperty('token');
expect(response.body.data.user).toMatchObject({
role: 'student',
email: 'testuser@example.com',
});
});

it('should return an error with invalid login credentials', async () => {
const response = await request(app)
.post('/api/user/login')
.send({
userIdentity: 'invaliduser',
password: 'wrongpassword',
});
expect(response.status).toBe(400);
expect(response.body.error).toBe(true);
expect(response.body.msg).toBe('Invalid login credentials');
});
});
