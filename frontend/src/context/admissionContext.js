import { createContext, useContext, useState } from 'react';

// Create a context
const AdmissionContext = createContext();

// Provider component
export const AdmissionProvider = ({ children }) => {
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
      zipCode: '',
    },
    familyInformation: {
      fatherName: '',
      guardianContact: '',
      // Add more fields for family information
    },
    // Add more sections as needed (e.g., academicInformation, etc.)
  });

  const handleChange = (section, event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: value, // Update the specific field in the specific section
      },
    }));
  };

  // Return the Provider with value
  return (
    <AdmissionContext.Provider value={{ formState, handleChange }}>
      {children}
    </AdmissionContext.Provider>
  );
}

// Custom hook to use the AdmissionContext
export const useAdmissionContext = () => {
  return useContext(AdmissionContext);
}
