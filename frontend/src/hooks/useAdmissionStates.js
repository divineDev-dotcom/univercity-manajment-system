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
zipCode: '',
fatherName: '',
fatherPrefix: '',
fatherPhoneNo: '',
fatherEmail: '',
fatherOccupation: '',
motherPrefix: '',
motherName: '',
motherPhoneNo: '',
motherEmail: '',
motherOccupation: ''
    // Add more fields as needed
    });
  const [formState, setFormState] = useState({
    personalInformation: {
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
    },
    familyInformation: {
      fatherName: '',
      motherName: '',
      guardianContact: '',
      // Add more fields for family information
    }
    // Add more sections as needed (e.g., academicInformation, etc.)
  });

  // Handle form changes by section and field
  function handleChange(section, event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: value, // Update the specific field in the specific section
      },
    }));
  }

  // Reset the form (you may want to reset specific sections as well)
  function resetForm() {
    setFormState({
      personalInformation: {
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
      },
      familyInformation: {
        fatherName: '',
        motherName: '',
        guardianContact: ''
      }
      // Reset other sections as needed
    });
  }

  return {
    formState,
    handleChange,
    resetForm,
  };
}

export default UseAdmissionStates;
