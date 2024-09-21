/*
This test uses jest and supertest. 
1. Use the following command to install:
npm install --save-dev jest supertest
2. Run the test script using the command:
npx jest test/user-register.test.js
*/

require("dotenv").config(); // adjust the path according to the .env file with the path property
const request = require('supertest'); // For making HTTP requests
const app = require('../app');        // Import your Express app
const mongoose = require('mongoose');
const Department = require("../models/department-model");
const { User } = require("../models/user-model");


describe('POST /api/department/createDepartment', () => {
  beforeAll(async () => {
    // Connect to your test database
//    await mongoose.connect("mongodb://127.0.0.1:27017/testums");
await mongoose.connect(process.env.MONGO_TEST_URI);
    // Optionally, clear any existing data before tests
    await User.deleteOne({ departmentCode: 'testuser' }); // Delete specific test user if exists    await User.deleteOne({ userName: 'testuser' }); // Delete specific test user if exists
  });

  afterAll(async () => {
    // Disconnect from the database after tests
    await mongoose.disconnect();
  });

  it('should create a new department successfully', async () => {
    const response = await request(app)  // No need to specify port here
      .post('/api/department/createDepartment')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlZjkzNTQ5Y2I0M2ZhNzUwN2UzYWEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY5MzczOTgsImV4cCI6MTcyNzAyMzc5OH0.AQo3lRq4Gup063pEygtx7QQjsPDoSIZFS8mwdP7PHT0')  // Include valid JWT
      .send({
        departmentCode: 'testuser',
        departmentName: 'testuser@example.com',
        headOfDepartment: 'password123',
      });

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.msg).toBe('Department created successfully');
  });

  it('should return an error when registering with a duplicate username or email', async () => {
    // First registration
    await request(app)
      .post('/api/department/createDepartment')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlZjkzNTQ5Y2I0M2ZhNzUwN2UzYWEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY5MzczOTgsImV4cCI6MTcyNzAyMzc5OH0.AQo3lRq4Gup063pEygtx7QQjsPDoSIZFS8mwdP7PHT0')  // Include valid JWT
      .send({
        departmentCode: 'testuser',
        departmentName: 'testuser@example.com',
        headOfDepartment: 'password123',
      });

    // Second registration with the same username and email
    const duplicateResponse = await request(app)
      .post('/api/department/createDepartment')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlZjkzNTQ5Y2I0M2ZhNzUwN2UzYWEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY5MzczOTgsImV4cCI6MTcyNzAyMzc5OH0.AQo3lRq4Gup063pEygtx7QQjsPDoSIZFS8mwdP7PHT0')  // Include valid JWT
      .send({
        departmentCode: 'testuser',   // Duplicate username
        departmentName: 'testuser@example.com', // Duplicate email
        headOfDepartment: 'password123',
      });

    // Assertions for the duplicate response
    expect(duplicateResponse.status).toBe(400);
    expect(duplicateResponse.body.error).toBe(true);
    expect(duplicateResponse.body.msg).toBe('Department with this code or name already exists.');
  });
});
