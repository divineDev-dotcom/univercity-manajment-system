import UseAdmissionStates from '../hooks/useAdmissionStates';
import UseCountries from '../hooks/useCountries';
import * as component from './barrel';

const StudentDetails = () => {
const {formState, handleChange} = UseAdmissionStates();
  const countries = UseCountries(); // Call the useCountries hook to get the country list
return(
<div>
<form>
      <fieldset>
        <legend>Personal Information</legend>
<div>
<label htmlFor="first_name"> Please Enter your First Name: </label>
<component.Input type="text" name="firstName" value={ formState.firstName } onChange={ handleChange } id="first_name" />
</div>
<div>
<label htmlFor="middle_name"> Enter your Middle Name (optional): </label>
<component.Input type="text" id="middle_name" name="middleName" value={ formState.middleName } onChange={ handleChange } required={ false} />
</div>
<div>
<label htmlFor="country"> Select your Country: </label>
<component.Combobox id="country" name="country" options={countries} value={formState.country} onChange={ handleChange } />
</div>
</fieldset>
</form>
</div>

);
}
export default StudentDetails;