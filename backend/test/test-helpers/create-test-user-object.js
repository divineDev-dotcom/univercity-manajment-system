const mongoose = require("mongoose");
const { User, Admin, Student, Faculty } = require("../../models/user-model");

const createTestUserObject = (role) => {
let user;

switch (role) {
case "admin":
user = new Admin({
userName: "adminUser",
email: "admin@example.com",
password: "password123",
role: "admin",
personalDetails: {
firstName: "Admin",
lastName: "User",
birthday: "1980-01-01",
gender: "female",
phone: "1234567890",
address: "456 Admin St",
city: "Admin City",
state: "Admin State",
country: "Admin Country",
zipCode: 12345,
},
hireDate: "2010-08-01",
salary: 50000.00, // Assume salary in Decimal128 format
createdBy: new mongoose.Types.ObjectId(), // Assuming createdBy is required
});
break;

case "student":
user = new Student({
userName: 'testuser',
email: 'testuser@example.com',
password: 'password123',
role: 'student',
personalDetails: {
firstName: 'Test',
lastName: 'User',
birthday: '1998-01-01',
gender: "male",
phone: '1234567890',
address: '123 Test Street',
city: 'Test City',
state: 'Test State',
country: 'Test Country',
zipCode: 12345,
},
createdBy: new mongoose.Types.ObjectId(), // Correctly creating ObjectId instance
});
break;

case "faculty":
user = new Faculty({
userName: "facultyUser",
email: "faculty@example.com",
password: "password123",
role: "faculty",
personalDetails: {
firstName: "Faculty",
lastName: "User",
birthday: "1975-05-15",
gender: "male",
phone: "9876543210",
address: "789 Faculty Lane",
city: "Faculty City",
state: "Faculty State",
country: "Faculty Country",
zipCode: 54321,
},
employmentStatus: "working",
departmentId: new mongoose.Types.ObjectId(), // Assume you provide a valid department ObjectId
hireDate: "2010-08-01",
salary: 50000.00, // Assume salary in Decimal128 format
subjects: [new mongoose.Types.ObjectId()], // Assume valid subject ObjectId
createdBy: new mongoose.Types.ObjectId(),
});
break;

default:
console.error(`Invalid role passed to test user creation: ${role}`);
} // end switch 

return user;
};

module.exports = createTestUserObject;