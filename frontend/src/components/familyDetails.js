import { useState } from 'react';
//import UseAdmissionStates from '../hooks/useAdmissionStates';
import * as component from './barrel';
import StudentDetails from './studentDetails'; // Assuming this is the component for personal information details

const FamilyDetails = () => {
  const { formState, handleChange } = UseAdmissionStates();
  const [activeSection, setActiveSection] = useState('familyInformation');

  const handleSectionChange = (section) => {
    setActiveSection(section); // Change the active section based on which collapsible is clicked
  };

  return (
    <div>
      {/* Collapsible for Personal Information */}
      <component.Collapsible
        title="Personal Information"
        onClick={() => handleSectionChange('personalInformation')}
      />

      {/* Collapsible for Family Information */}
      <component.Collapsible
        title="Family Information"
        onClick={() => handleSectionChange('familyInformation')}
      />

      {/* Conditionally render form sections based on activeSection */}
      {activeSection === 'personalInformation' && (
        <div>
          <h2>Personal Information</h2>
          {/* Render the StudentDetails form here */}
          <StudentDetails formState={formState} handleChange={handleChange} />
        </div>
      )}

      {activeSection === 'familyInformation' && (
        <div>
          <h2>Family Details</h2>
          <p>I am a form page for family details</p>
          {/* Add your family details form fields here */}
          <form>
            <label>Father's Name:</label>
            <input
              type="text"
              name="fatherName"
              value={formState.familyInformation?.fatherName || ''}
              onChange={(e) => handleChange(e, 'familyInformation')}
            />
            {/* Add more family-related fields as necessary */}
          </form>
        </div>
      )}
    </div>
  );
};

export default FamilyDetails;
