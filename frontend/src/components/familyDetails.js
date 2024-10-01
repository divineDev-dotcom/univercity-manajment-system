import UseAdmissionStates from '../hooks/useAdmissionStates';

const FamilyDetails = () => {
const {formState, handleChange} = UseAdmissionStates();
return(
<div>
<h2> family details </h2>
<p>
I am a form page for family details 
</p>
</div>
);
}
export default FamilyDetails;