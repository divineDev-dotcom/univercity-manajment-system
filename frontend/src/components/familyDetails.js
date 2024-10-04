import UseAdmissionStates from '../hooks/useAdmissionStates';
import StudentDetails from './studentDetails';
import * as component from './barrel';
const FamilyDetails = () => {
const {formState, handleChange} = UseAdmissionStates();
return(
<div>
<component.Collapsible title="personal information">
<StudentDetails />
</component.Collapsible>
<h2> family details </h2>
<p>
I am a form page for family details 
</p>
</div>
);
}
export default FamilyDetails;