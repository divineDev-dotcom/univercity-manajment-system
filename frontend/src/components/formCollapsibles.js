import Collapsible from './Collapsible'; // Import your reusable Collapsible component
import StudentDetails from './studentDetails'; // Assuming this is the component for personal information details
import FamilyDetails from './familyDetails'; // Import FamilyDetails or any other form components

const FormCollapsibles = ({ activeSection, setActiveSection }) => {
  return (
    <div>
      {/* Collapsible for Personal Information */}
      <Collapsible
        title="Personal Information"
        onClick={() => setActiveSection('personalInformation')}
      >
        <StudentDetails /> {/* Render the StudentDetails form here */}
      </Collapsible>

      {/* Collapsible for Family Information */}
      <Collapsible
        title="Family Information"
        onClick={() => setActiveSection('familyInformation')}
      >
        <FamilyDetails /> {/* Render the FamilyDetails form here */}
      </Collapsible>

      {/* Add more collapsibles for additional forms as needed */}
    </div>
  );
};

export default FormCollapsibles;
