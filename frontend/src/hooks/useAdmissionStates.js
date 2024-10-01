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
