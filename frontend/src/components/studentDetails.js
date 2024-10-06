import { Navigate, useNavigate } from 'react-router-dom';
//import UseAdmissionStates from '../hooks/useAdmissionStates';
import { useAdmissionContext } from '../context/admissionContext';
import UseCountries from '../hooks/useCountries';
import UseCountryCodes from '../hooks/useCountryCodes';
import * as component from './barrel';

const StudentDetails = () => {
const navigate = useNavigate();
//const { formState, handleChange, setFormState } = UseAdmissionStates();
const { formState, handleChange } = useAdmissionContext();
const countries = UseCountries(); 
const countryCodes = UseCountryCodes();
const handleClick = () => {
navigate("/studentfamilydetails");
}
return (
<div>
<main>
      <form>
        <fieldset>
           <legend>Personal Information</legend>
          
          <div>
            <label htmlFor="first_name"> First Name: </label>
            <component.Input 
              type="text" 
              name="firstName" 
              value={formState.personalInformation.firstName} 
              onChange={(event) => handleChange('personalInformation', event)} 
              id="first_name" 
            />
          </div>

          <div>
            <label htmlFor="middle_name"> Middle Name (optional): </label>
            <component.Input 
              type="text" 
              id="middle_name" 
              name="middleName" 
              value={formState.personalInformation.middleName} 
              onChange={(event) => handleChange('personalInformation', event)} 
              required={false} 
            />
          </div>

          <div>
            <label htmlFor="last_name"> Last Name: </label>
            <component.Input 
              type="text" 
              name="lastName" 
              value={formState.personalInformation.lastName} 
              onChange={(event) => handleChange('personalInformation', event)} 
              id="last_name" 
            />
          </div>

          <div>
            <label htmlFor="DOB"> enter your Date Of Birth (DD/MM/YY): </label>
            <component.Input 
              id="DOB" 
              name="dob" 
              type="text" 
              value={formState.personalInformation.dob} 
              onChange={(event) => handleChange('personalInformation', event)} 
            />
          </div>

          <div>
            <fieldset>
              <legend> Select your Gender:</legend>
              <label htmlFor="gender">your Gender:</label>
              <component.RadioButton 
                id="male" 
                label="Male" 
                name="gender" 
                value="Male" 
                onChange={(event) => handleChange('personalInformation', event)} 
                checked={formState.personalInformation.gender === "Male"} 
              />
              <component.RadioButton 
                id="female" 
                label="Female" 
                name="gender" 
                value="Female" 
                onChange={(event) => handleChange('personalInformation', event)} 
                checked={formState.personalInformation.gender === "Female"} 
              />
              <component.RadioButton 
                id="other" 
                label="Other" 
                name="gender" 
                value="Other" 
                onChange={(event) => handleChange('personalInformation', event)} 
                checked={formState.personalInformation.gender === "Other"} 
              />
            </fieldset>
          </div>

          <fieldset>
            <legend>Contact Information</legend>
            <div>
              <label htmlFor="phone_number"> Enter your Phone Number: </label>
              <component.Input 
                id="phone_number" 
                type="tel" 
                name="phoneNo"
                value={formState.personalInformation.phoneNo} 
                onChange={(event) => handleChange('personalInformation', event)} 
              />
            </div>
            <div>
              <label htmlFor="email">Enter  your Email Address: </label>
              <component.Input 
                id="email" 
                type="email" 
                name="email" 
                value={formState.personalInformation.email} 
                onChange={(event) => handleChange('personalInformation', event)} 
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Address</legend>
            <div>
              <label htmlFor="full_address"> your Address: </label>
              <component.Input 
                id="full_address" 
                type="text" 
                name="address" 
                value={formState.personalInformation.address} 
                onChange={(event) => handleChange('personalInformation', event)} 
              />
            </div>
            <div>
              <label htmlFor="city"> City: </label>
              <component.Input 
                id="city" 
                type="text" 
                name="city" 
                value={formState.personalInformation.city} 
                onChange={(event) => handleChange('personalInformation', event)} 
              />
            </div>

            <div>
              <label htmlFor="country"> Select your Country: </label>
              <component.Combobox 
                id="country" 
                name="country" 
                options={countries} 
                value={formState.personalInformation.country} 
                onChange={(event) => handleChange('personalInformation', event)} 
              />
            </div>

<div>
<label htmlFor="province"> enter your Province/state: </label>
<component.Input type="text" id="province" name="province" value={formState.personalInformation.province} onChange={(event) => handleChange('personalInformation', event)} required={true} />
</div>

                <div>
                  <label htmlFor="zip_code"> Please provide your Zip Code: </label>
                  <component.Input 
                    id="zip_code" 
                    type="text" 
                    name="zipCode" 
                    value={formState.personalInformation.zipCode} 
                    onChange={(event) => handleChange('personalInformation', event)} 
                  />
                </div>
              
            
          </fieldset>
<component.Button onClick={ handleClick } text="next to the family details" />
        </fieldset>
      </form>
</main>
    </div>
  );
}

export default StudentDetails;
