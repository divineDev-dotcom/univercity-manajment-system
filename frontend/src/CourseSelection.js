import React, { useState } from 'react';

const CourseSelection = () => {
const [selectedCourses, setSelectedCourses] = useState([]);
const [submissionMessage, setSubmissionMessage] = useState('');
const courses = [
'Introduction to Programming',
'Data Structures and Algorithms',
'Web Development',
'Database Systems',
'Operating Systems',
'Computer Networks',
'Commers', 
'English Honors', 
'history', 
'hindi honors', 
'Sanskrit honors', 
'sociology honors', 
'Maths honors', 
  ];

const handleCourseChange = (event) => {
const value = event.target.value;
setSelectedCourses((prevSelectedCourses) =>
prevSelectedCourses.includes(value)
? prevSelectedCourses.filter(course => course !== value)
: [...prevSelectedCourses, value]
    );
  };
const handleSubmit = (event) => {
event.preventDefault();
setSubmissionMessage(
`Thank you for selecting your courses. Your response has been recorded: ${selectedCourses.join(', ')}`
    );
  };

return (
<div className="course-selection">
<h1>Course Selection Form</h1>
<form onSubmit={handleSubmit}>
<fieldset>
<legend>Select your courses:</legend>
{courses.map((course) => (
<div key={course}>
<input type="checkbox" id={course}
value={course}
                checked={selectedCourses.includes(course)}
                onChange={handleCourseChange}
              />
              <label htmlFor={course}>{course}</label>
            </div>
          ))}
        </fieldset>
        <button type="submit">Submit</button>
      </form>

      {/* Display submission message */}
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
};

export default CourseSelection;
