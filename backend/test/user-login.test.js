/*
This test uses jest and supertest. 
1. Use the following command to install:
npm install --save-dev jest supertest
2. Run the test script using the command:
npx jest test/user-login.test.js
*/

require("dotenv").config(); // Adjust the path according to the .env file if necessary
const request = require("supertest");
const app = require("../app"); // Import your Express app
const mongoose = require("mongoose");
const User = require("../models/user-model");

describe('POST /user/login', () => {
  beforeAll(async () => {
    // Connect to your test database
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    // Disconnect from the database after tests
    await mongoose.disconnect();
  });

  it('should login successfully with valid credentials', async () => {
    // Pre-create a user for testing login
    const user = {
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
    };

    await request(app)
      .post('/user/register')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTEyMjMzNDQ1NTY2Nzc4ODk5MDAiLCJyb2xlIjoiYWRtaW4ifQ.2_6WwlWGCQu-viwSVNcWktqsp5Kbg-HLqZflGiR0Mb4') // Replace with actual JWT
      .send(user);

    const response = await request(app)
      .post('/user/login')
      .send({
        userIdentity: 'testuser', // You can use either userName or email
        password: 'password123',
      });

    // Assertions
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
      .post('/user/login')
      .send({
        userIdentity: 'invaliduser',
        password: 'wrongpassword',
      });

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toBe('Invalid login credentials');
  });
});
