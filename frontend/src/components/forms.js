import React, { useState, useRef } from 'react';

const form = () => {
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');

  const fileInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fullName) {
      setMessage('Full Name is required.');
      return;
    }
    if (!emailId) {
      setMessage('Email ID is required.');
      return;
    }
    if (!phoneNumber) {
      setMessage('Phone Number is required.');
      return;
    }
    if (!gender) {
      setMessage('Gender is required.');
      return;
}

setMessage('Your response has been received. Thank you!');

    setFullName('');
    setEmailId('');
    setPhoneNumber('');
    setGender('');

return (
    <div>
      <h2>Forms</h2>
      <p>Fill out the form.</p>
<form id="form" name="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Student Details</legend>
                    <label htmlFor="full_name">Full Name:</label>
          <input
            type="text"
            name="full_name"
            id="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            autoFocus
            placeholder="Enter your full name"
            aria-required="true"
            aria-label="Full Name"
          />
          <br />
          
          <label htmlFor="email_id">Email ID:</label>
          <input
            type="email"
            name="email_id"
            id="email_id"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
            placeholder="Enter your email address"
            aria-required="true"
            aria-label="Email ID"
          />
          <br />
          
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="[0-9]{10}"
            title="Enter a 10-digit phone number"
            required
            placeholder="Enter your phone number"
            aria-required="true"
            aria-label="Phone Number"
          />
          <br />
          
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            aria-required="true"
            aria-label="Gender"
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <br />
                    
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
      <div id="confirmationDiv">
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Form;