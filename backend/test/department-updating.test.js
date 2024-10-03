require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Department = require("../models/department-model");

describe('PUT /api/department/updateDepartment/:id', () => {
  let department;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZhYTdjZjg5MTkxY2JhZGZmYjRkNjMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjc3MDI5OTEsImV4cCI6MTcyNzc4OTM5MX0.dc3BQ30Ye_WY1dKfYv7aPdlqpthKxHPKzzT7_-iTXU0"; // Hardcoded token

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_TEST_URI);

    // Create a department to update
    department = new Department({
      departmentCode: "CS101",
      departmentName: "Computer Science",
      headOfDepartment: "Dr. Smith",
      createdBy: new mongoose.Types.ObjectId('66faa7cf89191cbadffb4d63'), // Use 'new' here
      updatedBy: new mongoose.Types.ObjectId('66faa7cf89191cbadffb4d63')  // Use 'new' here
    });
    await department.save();
  });

  afterAll(async () => {
    // Clean up the test data
    await Department.deleteMany({});
    await mongoose.disconnect();
  });

  it('should update the department successfully with valid data', async () => {
    const response = await request(app)
      .put(`/api/department/updateDepartment/${department._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        departmentCode: "CS102",
        departmentName: "Computer Science Updated",
        headOfDepartment: "Dr. Johnson"
      });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.msg).toBe("Department updated successfully");
    expect(response.body.data).toHaveProperty('departmentCode', "CS102");
    expect(response.body.data).toHaveProperty('departmentName', "Computer Science Updated");
  });

  it('should return an error if the department is not found', async () => {
    const response = await request(app)
      .put('/api/department/updateDepartment/invalidID')
      .set('Authorization', `Bearer ${token}`)
      .send({
        departmentCode: "CS102",
        departmentName: "Computer Science Updated",
        headOfDepartment: "Dr. Johnson"
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toBe("Department not found.");
  });

  it('should return an error if department code or name is missing', async () => {
    const response = await request(app)
      .put(`/api/department/updateDepartment/${department._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ headOfDepartment: "Dr. Johnson" }); // Missing departmentCode and departmentName

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toBe('Department code and name are required.');
  });
});
