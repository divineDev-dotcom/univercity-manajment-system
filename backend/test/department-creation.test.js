const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { createDepartment } = require('../controllers/department-controller');
const Department = require('../models/department-model');

const app = express();
app.use(express.json()); // to parse JSON bodies

// Mock the endpoint
app.post('/api/department/createDepartment', createDepartment);

describe('POST /api/department/createDepartment', () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect('mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });


  test('should create a department successfully', async () => {
    const departmentData = {
      departmentCode: 'CS101',
      departmentName: 'Computer Science',
      headOfDepartment: 'John Doe',
    };

    const response = await request(app)
      .post('/api/department/createDepartment')
      .send(departmentData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body.message).toBe('Department created successfully');
    expect(response.body.data.departmentCode).toBe(departmentData.departmentCode);
    expect(response.body.data.departmentName).toBe(departmentData.departmentName);
  });

  test('should return 400 if department code is missing', async () => {
    const departmentData = {
      departmentName: 'Computer Science',
    };

    const response = await request(app)
      .post('/api/department/createDepartment')
      .send(departmentData)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.message).toBe('Department code and name are required.');
  });

  test('should return 400 if department already exists', async () => {
    const departmentData = {
      departmentCode: 'CS101',
      departmentName: 'Computer Science',
    };

    // First request to create the department
    await request(app)
      .post('/api/department/createDepartment')
      .send(departmentData)
      .expect('Content-Type', /json/)
      .expect(201);

    // Second request should fail due to duplicate
    const response = await request(app)
      .post('/api/department/createDepartment')
      .send(departmentData)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.message).toBe('Department with this code or name already exists.');
  });

  test('should return 500 on server error', async () => {
    // Mock a server error
    jest.spyOn(Department.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Server error');
    });

    const departmentData = {
      departmentCode: 'CS101',
      departmentName: 'Computer Science',
    };

    const response = await request(app)
      .post('/api/department/createDepartment')
      .send(departmentData)
      .expect('Content-Type', /json/)
      .expect(500);

    expect(response.body.message).toBe('Internal server error');

    // Restore the original method
    jest.restoreAllMocks();
  });
});
