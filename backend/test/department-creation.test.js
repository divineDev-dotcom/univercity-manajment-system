const request = require('supertest'); // For making HTTP requests
const app = require('../app');        // Import your Express app
const mongoose = require('mongoose');
const Department = require("../models/department-model");

describe('POST /api/department/createDepartment', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/ums");
      
      // Optionally, clear any existing data before tests
      await Department.deleteMany({ departmentCode: 'testuser' });
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create a new department successfully', async () => {
    const response = await request(app)
      .post('/api/department/createDepartment')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTEyMjMzNDQ1NTY2Nzc4ODk5MDAiLCJyb2xlIjoiYWRtaW4ifQ.2_6WwlWGCQu-viwSVNcWktqsp5Kbg-HLqZflGiR0Mb4')  // Include valid JWT
      .send({
        departmentCode: 'testuser',
        departmentName: 'testuser',
        headOfDepartment: 'Ashish',
      });

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.msg).toBe('Department created successfully');
  });

  it('should return an error when registering with a duplicate departmentCode', async () => {
    await request(app)
      .post('/api/department/createDepartment')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTEyMjMzNDQ1NTY2Nzc4ODk5MDAiLCJyb2xlIjoiYWRtaW4ifQ.2_6WwlWGCQu-viwSVNcWktqsp5Kbg-HLqZflGiR0Mb4')
      .send({
        departmentCode: 'testuser',
        departmentName: 'testuser',
        headOfDepartment: 'Ashish',
      });

    const duplicateResponse = await request(app)
      .post('/api/department/createDepartment')
      .set('Authorization', 'Bearer validtokenhere')
      .send({
        departmentCode: 'testuser',
        departmentName: 'testuser',
        headOfDepartment: 'Ashish',
      });

    // Assertions for the duplicate response
    expect(duplicateResponse.status).toBe(400);
    expect(duplicateResponse.body.error).toBe(true);
    expect(duplicateResponse.body.msg).toBe('Department with this code or name already exists.');
  });

  it('should return 401 if JWT token is missing', async () => {
    const response = await request(app)
      .post('/api/department/createDepartment')
      .send({
        departmentCode: 'missingtoken',
        departmentName: 'missingtoken',
        headOfDepartment: 'Ashish',
      });

    // Assertions
    expect(response.status).toBe(401);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toBe('Token is missing');
  });

  it('should return 403 if JWT token is invalid', async () => {
    const response = await request(app)
      .post('/api/department/createDepartment')
      .set('Authorization', 'Bearer invalidtoken')
      .send({
        departmentCode: 'invalidtoken',
        departmentName: 'invalidtoken',
        headOfDepartment: 'Ashish',
      });

    // Assertions
    expect(response.status).toBe(403);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toBe('Invalid token');
  });
});
