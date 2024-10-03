import { useState } from 'react';

function UseAdmissionStates() {
const [formState, setFormState] = useState({
firstName: '',
middleName: '',
lastName: '',
    dob: '',
gender: '',
countryCode: '',
phoneNo: '',
email: '',
address: '',
city: '',
country: '',
province: '',
zipCode: ''
    // Add more fields as needed
    });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormState({
      firstName: '',
      middleName: '',
      lastName: '',
      country: '',
      province: '',
      department: '',
      course: '',
      year: '',
    });
  }

  return {
    formState,
    handleChange,
    resetForm,
  };
}

export default UseAdmissionStates;
