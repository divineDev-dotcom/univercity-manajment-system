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
const User = require("../models/user-model");

describe('POST /user/register', () => {
  beforeAll(async () => {
    // Connect to your test database
//    await mongoose.connect("mongodb://127.0.0.1:27017/ums");
await mongoose.connect(process.env.MONGO_URI);
    // Optionally, clear any existing data before tests
    await User.deleteOne({ userName: 'testuser' }); // Delete specific test user if exists    await User.deleteOne({ userName: 'testuser' }); // Delete specific test user if exists
  });

  afterAll(async () => {
    // Disconnect from the database after tests
    await mongoose.disconnect();
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)  // No need to specify port here
      .post('/user/register')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTEyMjMzNDQ1NTY2Nzc4ODk5MDAiLCJyb2xlIjoiYWRtaW4ifQ.2_6WwlWGCQu-viwSVNcWktqsp5Kbg-HLqZflGiR0Mb4')  // Include valid JWT
      .send({
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
        profilePicture: 'http://example.com/profile.jpg',
      });

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.msg).toBe('User registered successfully');
  });

  it('should return an error when registering with a duplicate username or email', async () => {
    // First registration
    await request(app)
      .post('/user/register')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTEyMjMzNDQ1NTY2Nzc4ODk5MDAiLCJyb2xlIjoiYWRtaW4ifQ.2_6WwlWGCQu-viwSVNcWktqsp5Kbg-HLqZflGiR0Mb4')  // Include valid JWT
      .send({
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
        profilePicture: 'http://example.com/profile.jpg',
      });

    // Second registration with the same username and email
    const duplicateResponse = await request(app)
      .post('/user/register')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTEyMjMzNDQ1NTY2Nzc4ODk5MDAiLCJyb2xlIjoiYWRtaW4ifQ.2_6WwlWGCQu-viwSVNcWktqsp5Kbg-HLqZflGiR0Mb4')  // Include valid JWT
      .send({
        userName: 'testuser',   // Duplicate username
        email: 'testuser@example.com', // Duplicate email
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
        profilePicture: 'http://example.com/profile.jpg',
      });

    // Assertions for the duplicate response
    expect(duplicateResponse.status).toBe(400);
    expect(duplicateResponse.body.error).toBe(true);
    expect(duplicateResponse.body.msg).toBe('Username or email already exists');
  });
});
