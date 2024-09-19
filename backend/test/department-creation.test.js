const request = require('supertest'); // For making HTTP requests
const app = require('../app');        // Import your Express app
const mongoose = require('mongoose');
const Department = require("../models/department-model");

describe('POST /api/department/createDepartment', () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/ums");
    
    // Optionally, clear any existing data before tests
    await Department.deleteOne({ departmentCode: 'testuser' }); // Delete specific test user if exists
  });

  afterAll(async () => {
    // Disconnect from the database after tests
    await mongoose.disconnect();
  });

  it('should create a new department successfully', async () => {
    const response = await request(app)  // No need to specify port here
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
    // First registration
    await request(app)
      .post('/api/department/createDepartment')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTEyMjMzNDQ1NTY2Nzc4ODk5MDAiLCJyb2xlIjoiYWRtaW4ifQ.2_6WwlWGCQu-viwSVNcWktqsp5Kbg-HLqZflGiR0Mb4')  // Include valid JWT
      .send({
departmentCode: 'testuser',
departmentName: 'testuser',
headOfDepartment: 'Ashish',
      });

    // Second creation with the same departmentCode
    const duplicateResponse = await request(app)
      .post('/api/department/createDepartment')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTEyMjMzNDQ1NTY2Nzc4ODk5MDAiLCJyb2xlIjoiYWRtaW4ifQ.2_6WwlWGCQu-viwSVNcWktqsp5Kbg-HLqZflGiR0Mb4')  // Include valid JWT
      .send({
departmentCode: 'testuser',   // Duplicate username
departmentName: 'testuser', // Duplicate
headOfDepartment: 'Ashish',
      });

    // Assertions for the duplicate response
    expect(duplicateResponse.status).toBe(400);
    expect(duplicateResponse.body.error).toBe(true);
    expect(duplicateResponse.body.msg).toBe('Department with this code or name already exists.');
  });
});
