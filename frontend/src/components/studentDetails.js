import { Navigate, useNavigate} from 'react-router-dom';
import UseAdmissionStates from '../hooks/useAdmissionStates';
import UseCountries from '../hooks/useCountries';
import UseCountryCodes from '../hooks/useCountryCodes';
import * as component from './barrel';

const StudentDetails = () => {
const navigate = useNavigate();
  const { formState, handleChange, setFormState } = UseAdmissionStates();
  const countries = UseCountries(); // Fetch the country list
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
              value={formState.firstName} 
              onChange={handleChange} 
              id="first_name" 
            />
          </div>

          <div>
            <label htmlFor="middle_name"> Middle Name (optional): </label>
            <component.Input 
              type="text" 
              id="middle_name" 
              name="middleName" 
              value={formState.middleName} 
              onChange={handleChange} 
              required={false} 
            />
          </div>

          <div>
            <label htmlFor="last_name"> Last Name: </label>
            <component.Input 
              type="text" 
              name="lastName" 
              value={ formState.lastName } 
              onChange={ handleChange } 
              id="last_name" 
            />
          </div>

          <div>
            <label htmlFor="DOB"> enter your Date Of Birth (DD/MM/YY): </label>
            <component.Input 
              id="DOB" 
              name="dob" 
              type="text" 
              value={ formState.dob } 
              onChange={ handleChange } 
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
                onChange={ handleChange }
                checked={ formState.gender === "Male"} 
              />
              <component.RadioButton 
                id="female" 
                label="Female" 
                name="gender" 
                value="Female" 
                onChange={ handleChange }
                checked={ formState.gender === "Female"} 
              />
              <component.RadioButton 
                id="other" 
                label="Other" 
                name="gender" 
                value="Other" 
                onChange={ handleChange }
                checked={ formState.gender === "Other"} 
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
                value={ formState.phoneNo} 
                onChange={ handleChange } 
              />
            </div>
            <div>
              <label htmlFor="email">Enter  your Email Address: </label>
              <component.Input 
                id="email" 
                type="email" 
                name="email" 
                value={ formState.email} 
                onChange={ handleChange } 
              />
            </div>
          </fieldset>

          <fieldset>
            <h3><legend>Address</legend></h3>
            <div>
              <label htmlFor="full_address"> your Address: </label>
              <component.Input 
                id="full_address" 
                type="text" 
                name="address" 
                value={ formState.address} 
                onChange={ handleChange } 
              />
            </div>
            <div>
              <label htmlFor="city"> City: </label>
              <component.Input 
                id="city" 
                type="text" 
                name="city" 
                value={ formState.city } 
                onChange={ handleChange } 
              />
            </div>

            <div>
              <label htmlFor="country"> Select your Country: </label>
              <component.Combobox 
                id="country" 
                name="country" 
                options={countries} 
                value={formState.country} 
                onChange={ handleChange } 
              />
            </div>

<div>
<label htmlFor="province"> enter your Province/state: </label>
<component.Input type="text" id="province" name="province" value={ formState.province } onChange={ handleChange } required={true} />
</div>

                <div>
                  <label htmlFor="zip_code"> Please provide your Zip Code: </label>
                  <component.Input 
                    id="zip_code" 
                    type="text" 
                    name="zipCode" 
                    value={ formState.zipCode } 
                    onChange={ handleChange } 
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