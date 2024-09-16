require("dotenv").config(); // Load environment variables
const request = require("supertest");
const app = require("../app"); // Your Express app
const mongoose = require("mongoose");
const User = require("../models/user-model");

describe('PUT /user/update-profile/:id', () => {
  let userToken, adminToken, userId, adminId;

  beforeAll(async () => {
    // Connect to your test database
    await mongoose.connect(process.env.MONGO_URI);
    
    try {
      // Create an admin and a user for testing
      const admin = new User({
        userName: 'adminUser',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        personalDetails: {
          firstName: 'Admin',
          lastName: 'User',
          birthday: '1980-01-01', // Required field
          phone: '1234567890',
          address: 'Admin Street',
          city: 'Admin City',
          country: 'Admin Country'
        }
      });

      const user = new User({
        userName: 'regularUser',
        email: 'user@example.com',
        password: 'password123',
        role: 'student',
        personalDetails: {
          firstName: 'Regular',
          lastName: 'User',
          birthday: '1995-05-05', // Required field
          phone: '0987654321',
          address: 'User Street',
          city: 'User City',
          country: 'User Country'
        }
      });

      await admin.save();
      await user.save();

      // Generate JWT tokens for both admin and user
      const generateJWT = require('../helpers/jwt-helper');
      adminToken = generateJWT(admin._id, admin.role);
      userToken = generateJWT(user._id, user.role);
      userId = user._id;
      adminId = admin._id;
    } catch (error) {
      console.error(error.message);
    }
  });

  afterAll(async () => {
    // Clean up: Remove test users and close the connection
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  it('should allow a user to update their own profile', async () => {
    const updatedDetails = {
      personalDetails: {
        firstName: 'Updated',
        lastName: 'User',
        birthday: '1995-05-05', // Required field still included
        phone: '9876543210',
        address: 'Updated Street',
        city: 'Updated City',
        country: 'Updated Country'
      }
    };

    const response = await request(app)
      .put(`/user/update-profile/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(updatedDetails);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.personalDetails).toMatchObject({
        lastName: 'User',
        phone: '9876543210',
        address: 'Updated Street',
});
  });

  it('should prevent a user from updating another user’s profile', async () => {
    const updatedDetails = {
      personalDetails: {
        firstName: 'Unauthorized',
        lastName: 'Change',
        birthday: '1980-01-01' // Required field
      }
    };

    const response = await request(app)
      .put(`/user/update-profile/${adminId}`)
      .set('Authorization', `Bearer ${userToken}`) // Using regular user's token
      .send(updatedDetails);

    expect(response.status).toBe(403); // Forbidden access
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toBe('Forbidden: you do not have access to this resource');
  });

  it('should allow an admin to update any user’s profile', async () => {
    const updatedDetails = {
      personalDetails: {
        firstName: 'AdminUpdated',
        lastName: 'User',
        birthday: '1995-05-05', // Required field still included
        phone: '9999999999',
        address: 'Admin Updated Street',
        city: 'Admin Updated City',
        country: 'Admin Updated Country'
      }
    };

    const response = await request(app)
      .put(`/user/update-profile/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`) // Admin token
      .send(updatedDetails);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.personalDetails).toMatchObject({
        firstName: 'AdminUpdated',
        lastName: 'User',
        phone: '9999999999',
        address: 'Admin Updated Street',
        city: 'Admin Updated City',
});
  });

  it('should return a 400 error for invalid userId', async () => {
    const invalidUserId = 'invalidUserId';

    const response = await request(app)
      .put(`/user/update-profile/${invalidUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        personalDetails: {
          firstName: 'InvalidUpdate',
          lastName: 'User',
          birthday: '1995-05-05' // Required field
        }
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toBe('Received invalid ID for requested resource');
  });
});
