import { useState } from 'react';

function UseAdmissionStates() {
  const [formState, setFormState] = useState({
    firstName: '',
middleName: '',
lastName: '',
country: '',
province: '',
    department: '',
    course: '',
    year: '',
    // Add more fields as needed
  });

  // Handle input changes dynamically
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Reset form to initial state
  function resetForm() {
    setFormState({
      name: '',
      department: '',
      course: '',
      year: '',
      // Reset all other fields as needed
    });
  }

  return {
    formState,
    handleChange,
    resetForm,
  };
}

export default UseAdmissionStates;