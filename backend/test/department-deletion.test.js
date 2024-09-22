const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Department = require('../models/department-model');
require('dotenv').config(); // Load environment variables from .env file

jest.setTimeout(30000); // Set Jest timeout to 30 seconds

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 30000,  // 30 seconds
  });

  // Create a department to delete later
  const department = new Department({
    departmentCode: 'CS101',
    departmentName: 'Computer Science',
    headOfDepartment: 'John Doe',
    createdBy: new mongoose.Types.ObjectId(),
    updatedBy: new mongoose.Types.ObjectId(),
  });

  await department.save();
});

afterAll(async () => {
  // Cleanup the database after tests
  await Department.deleteMany({});
  await mongoose.connection.close();
});

describe('DELETE /api/department/deleteDepartment/:_id', () => {
  it('should delete a department by ID', async () => {
    // Test for successful department deletion
  });

  it('should return 404 if department not found', async () => {
    // Test for department not found case
  });

  it('should return 400 for an invalid department ID', async () => {
    // Test for invalid department ID case
  });
});
