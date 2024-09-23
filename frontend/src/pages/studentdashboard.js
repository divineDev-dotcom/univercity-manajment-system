import React from "react";

const StudentDashboard = () => {
return (
<div className="dashboard-container">
<h2>Shooting Star University - Student Dashboard</h2>
<section className="profile-section">
<h3>Student Profile</h3>
<div className="profile-info">
          <p><strong>Name:</strong> Ravi Sharma</p>
          <p><strong>Student ID:</strong> 123456</p>
          <p><strong>Program:</strong> Bachelor of Computer Science</p>
          <p><strong>Year:</strong> 3rd Year</p> {/* Corrected this line */}
          <p><strong>Email:</strong> ravisharma@shootingstar.edu</p>
        </div>
      </section>

      <section className="courses-section">
        <h3>Enrolled Courses</h3>
        <ul>
          <li>CS101 - Introduction to Programming</li>
          <li>CS203 - Data Structures and Algorithms</li>
          <li>CS305 - Web Development</li>
          <li>CS402 - Artificial Intelligence</li>
        </ul>
      </section>

      <section className="grades-section">
        <h3>Current Grades</h3>
        <table className="grades-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CS101 - Introduction to Programming</td>
              <td>A</td>
            </tr>
            {/* Add other courses/grades as needed */}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default StudentDashboard;
