import UseAdmissionStates from '../hooks/useAdmissionStates';
import UseCountries from '../hooks/useCountries';
import UseProvinces from '../hooks/useProvinces'; // Make sure it's `UseProvinces`
import * as component from './barrel';
import { useEffect } from 'react';

const StudentDetails = () => {
  const { formState, handleChange, setFormState } = UseAdmissionStates();
  const countries = UseCountries(); // Fetch the country list
  const provinces = UseProvinces(formState.country); // Fetch provinces based on selected country

  useEffect(() => {
    console.log("Selected Country:", formState.country);
  }, [formState.country]);

  useEffect(() => {
    console.log("Fetched Provinces:", provinces);
  }, [provinces]);

  return (
    <div>
      <form>
        <fieldset>
          <h2><legend>Personal Information</legend></h2>
          
          {/* First Name */}
          <div>
            <label htmlFor="first_name"> Please Enter your First Name: </label>
            <component.Input 
              type="text" 
              name="firstName" 
              value={formState.firstName} 
              onChange={handleChange} 
              id="first_name" 
            />
          </div>

          {/* Middle Name */}
          <div>
            <label htmlFor="middle_name"> Enter your Middle Name (optional): </label>
            <component.Input 
              type="text" 
              id="middle_name" 
              name="middleName" 
              value={formState.middleName} 
              onChange={handleChange} 
              required={false} 
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="last_name"> Please enter your Last Name: </label>
            <component.Input 
              type="text" 
              name="lastName" 
              value={ formState.lastName } 
              onChange={ handleChange } 
              id="last_name" 
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="DOB"> Please enter your Date Of Birth (DD/MM/YY) </label>
            <component.Input 
              id="DOB" 
              name="dob" 
              type="text" 
              value={ formState.dob } 
              onChange={ handleChange } 
            />
          </div>

          {/* Gender */}
          <div>
            <fieldset>
              <legend> Select your Gender:</legend>
              <label htmlFor="gender">Select your Gender:</label>
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
                id="others" 
                label="Others" 
                name="gender" 
                value="Others" 
                onChange={ handleChange }
                checked={ formState.gender === "Others"} 
              />
            </fieldset>
          </div>

          {/* Contact Information */}
          <fieldset>
            <h3><legend>Contact Information</legend></h3>
            <div>
              <label htmlFor="phone_number"> Please provide your Mobile Number: </label>
              <component.Input 
                id="phone_number" 
                type="number" 
                name="mobile"
                value={ formState.mobile } 
                onChange={ handleChange } 
              />
            </div>
            <div>
              <label htmlFor="email"> Please provide your Email Address: </label>
              <component.Input 
                id="email" 
                type="email" 
                name="emailAddress" 
                value={ formState.emailAddress } 
                onChange={ handleChange } 
              />
            </div>
          </fieldset>

          {/* Address */}
          <fieldset>
            <h3><legend>Address</legend></h3>
            <div>
              <label htmlFor="full_address"> Please provide your Full Address: </label>
              <component.Input 
                id="full_address" 
                type="text" 
                name="fullAddress" 
                value={ formState.fullAddress } 
                onChange={ handleChange } 
              />
            </div>
            <div>
              <label htmlFor="city"> Please provide your City: </label>
              <component.Input 
                id="city" 
                type="text" 
                name="city" 
                value={ formState.city } 
                onChange={ handleChange } 
              />
            </div>

            {/* Country Selection */}
            <div>
              <label htmlFor="country"> Select your Country: </label>
              <component.Combobox 
                id="country" 
                name="country" 
                options={countries} 
                value={formState.country} 
                onChange={(e) => {
                  handleChange(e);
                  setFormState(prevState => ({ ...prevState, province: "" })); // Reset province on country change
                }} 
              />
            </div>

            {/* Province Selection */}
            {formState.country && provinces.length > 0 && (
              <>
                <div>
                  <label htmlFor="province"> Select your State/Province: </label>
                  <component.Combobox 
                    id="province" 
                    name="province" 
                    options={provinces.map((province) => province.state_name)} 
                    value={formState.province} 
                    onChange={handleChange} 
                  />
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
              </>
            )}
          </fieldset>
        </fieldset>
      </form>
    </div>
  );
}

export default StudentDetails;
