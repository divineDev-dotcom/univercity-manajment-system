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
          <legend>Personal Information</legend>
          
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
          )}
          
        </fieldset>
      </form>
    </div>
  );
}

export default StudentDetails;
