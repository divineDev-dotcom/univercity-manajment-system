/*
This test uses jest and supertest. 
1. Use the following command to install:
npm install --save-dev jest supertest
2. Run the test script using the command:
npx jest test/user-profile.test.js
*/

require("dotenv").config(); // Adjust the path according to the .env file if necessary
const request = require("supertest");
const app = require("../app"); // Import your Express app
const mongoose = require("mongoose");
const User = require("../models/user-model");

describe('GET /user/profile', () => {
  let adminToken, userToken, userId, adminId;

  beforeAll(async () => {
    // Connect to your test database
    await mongoose.connect(process.env.MONGO_URI);

    // Create an admin and a user to test the profile route
    const admin = new User({
      userName: 'adminUser',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
      personalDetails: {
        firstName: 'Admin',
        lastName: 'User',
        birthday: '1980-01-01',
        phone: '1234567890',
        address: 'Admin Street',
        city: 'Admin City',
        state: 'Admin State',
        country: 'Admin Country',
        zipCode: 12345,
      },
    });

    const user = new User({
      userName: 'regularUser',
      email: 'regular@example.com',
      password: 'password123',
      role: 'student',
      personalDetails: {
        firstName: 'Regular',
        lastName: 'User',
        birthday: '1995-05-05',
        phone: '0987654321',
        address: 'User Street',
        city: 'User City',
        state: 'User State',
        country: 'User Country',
        zipCode: 54321,
      },
    });

    await admin.save();
    await user.save();

    // Generate tokens
    const generateJWT = require('../helpers/jwt-helper');
    adminToken = generateJWT(admin._id, admin.role);
    userToken = generateJWT(user._id, user.role);
    userId = user._id;
    adminId = admin._id;
  });

  afterAll(async () => {
    // Clean up by deleting test users
    await User.deleteMany({});
    // Disconnect from the database after tests
    await mongoose.disconnect();
  });

  it('should allow admin to access any user profile', async () => {
    const response = await request(app)
      .get(`/user/profile?profileId=${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.userProfile).toMatchObject({
      userName: 'regularUser',
      email: 'regular@example.com',
      role: 'student',
      personalDetails: {
        firstName: 'Regular',
        lastName: 'User',
      },
    });
  });

  it('should allow a user to access their own profile', async () => {
    const response = await request(app)
      .get(`/user/profile?profileId=${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.userProfile).toMatchObject({
      userName: 'regularUser',
      email: 'regular@example.com',
      role: 'student',
      personalDetails: {
        firstName: 'Regular',
        lastName: 'User',
      },
    });
  });

  it('should return an error if user tries to access another user’s profile', async () => {
    const response = await request(app)
      .get(`/user/profile?profileId=${adminId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toBe('Forbidden: you do not have access to this resource');
  });

  it('should return an error if profileId is invalid', async () => {
    const response = await request(app)
      .get(`/user/profile?profileId=invalidId`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toBe('Invalid profileId');
  });
});
