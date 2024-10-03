import React, { useState } from 'react';

const AdminDashboard = () => {
const [employees, setEmployees] = useState([]);
const [departments, setDepartments] = useState([]);
const [name, setName] = useState('');
const [department, setDepartment] = useState('');
const [salary, setSalary] = useState('');

  const addEmployee = () => {
    setEmployees([...employees, { name, department, salary }]);
    setName('');
    setDepartment('');
    setSalary('');
  };

  const removeEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const addDepartment = () => {
    if (department && !departments.includes(department)) {
      setDepartments([...departments, department]);
      setDepartment('');
    }
  };

  return (
    <div>
      <h2>Shooting Star University Admin Dashboard</h2>
      
      <div>
        <h3>Add Employee</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>

      <div>
        <h3>Employee List</h3>
        <ul>
          {employees.map((employee, index) => (
            <li key={index}>
              {employee.name} - {employee.department} - {employee.salary}{' '}
              <button onClick={() => removeEmployee(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Add Department</h3>
        <input
          type="text"
          placeholder="New Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button onClick={addDepartment}>Add Department</button>
      </div>

      <div>
        <h3>Department List</h3>
        <ul>
          {departments.map((dept, index) => (
            <li key={index}>{dept}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admindashboard;
