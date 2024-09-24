require('dotenv').config(); // Load .env variables
const request = require('supertest');
const app = require('../app'); // Path to your main app file
const mongoose = require('mongoose');
const Department = require('../models/department-model'); // Path to your department model
const generateJWT = require('../helpers/jwt-helper'); // Adjust the path to your generateJWT function

describe('Department Routes', () => {
  let token;

  beforeAll(async () => {
    // Generate the actual token
    token = generateJWT('adminId', 'admin'); // Using your helper to generate the token

    // Connect to a test database
    const url = process.env.MONGO_TEST_URI;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Clear all collections and close the database connection
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe('GET /api/department/getDepartments', () => {
    let department1, department2;

    beforeEach(async () => {
      // Insert sample departments into the database
      department1 = new Department({
        departmentCode: 'CS101',
        departmentName: 'Computer Science',
        headOfDepartment: 'John Doe',
      });
      department2 = new Department({
        departmentCode: 'ME101',
        departmentName: 'Mechanical Engineering',
        headOfDepartment: 'Jane Smith',
      });
      await department1.save();
      await department2.save();
    });

    afterEach(async () => {
      // Clear the departments collection after each test
      await Department.deleteMany({});
    });

    it('should return all departments', async () => {
      const res = await request(app)
        .get('/api/department/getDepartments')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.error).toBe(false);
      expect(res.body.msg).toBe('Departments found');
      expect(res.body.data.length).toBe(2);
      expect(res.body.data[0].departmentName).toBe('Computer Science');
    });

    it('should return a specific department by ID', async () => {
      const res = await request(app)
        .get(`/api/department/getDepartments/${department1._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.error).toBe(false);
      expect(res.body.msg).toBe('Department found');
      expect(res.body.data.departmentName).toBe('Computer Science');
    });

    it('should return 404 if no department found with the given ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId(); // Changed instantiation
      const res = await request(app)
        .get(`/api/department/getDepartments/${nonExistentId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(res.body.error).toBe(true);
      expect(res.body.msg).toBe('Department not found');
    });
  });
});
