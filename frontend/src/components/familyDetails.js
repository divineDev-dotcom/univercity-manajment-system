import { useState } from 'react';
import UseAdmissionStates from '../hooks/useAdmissionStates';
import * as component from './barrel';

import StudentDetails from './studentDetails';
import * as component from './barrel';
const FamilyDetails = () => {
const {formState, handleChange, setFormState} = UseAdmissionStates();
  const fatherPrefixes = [
    "None",        
    "Mr.",
    "Dr.",
    "Prof.",
    "Sir",
    "Hon.",    // Honorable
    "Rev.",    // Reverend
    "Adv.",    // Advocate
    "Arch."    // Architect
  ];
const [selectedPrefix] = useState(fatherPrefixes)
const fatherOccupationOptions = [
  "Retired",
  "Self-Employed",
  "Doctor",
  "Lawyer",
  "Engineer",
  "Teacher",
  "Accountant",
  "Architect",
  "Business Owner",
  "Scientist",
  "Writer",
  "Artist",
  "Carpenter",
  "Electrician",
  "Plumber",
  "Mechanic",
  "Welder",
  "Mason",
  "Police Officer",
  "Firefighter",
  "Social Worker",
  "Government Official",
  "Farmer",
  "Fisherman",
  "Salesperson",
  "Driver",
  "Chef",
  "Retail Worker",
  "IT Professional",
  "Healthcare Professional",
  "Finance Professional",
  "Education Professional",
  "Others",
];
const [selectedOccupation] = useState(fatherOccupationOptions)
const motherPrefixes = ["Mrs.", "Ms.", "Miss", "Dr.", "Prof.", "Lady", "Madam"];
const [prefixes] = useState(motherPrefixes)
const motherOccupations = [
  "Homemaker",
  "Teacher",
  "Doctor",
  "Engineer",
  "Lawyer",
  "Nurse",
  "Businesswoman",
  "Scientist",
  "Artist",
  "Professor",
  "Manager",
  "Accountant",
  "Entrepreneur",
  "Social Worker",
  "Architect",
  "Consultant",
  "Civil Servant",
  "Pharmacist",
  "Psychologist",
  "Researcher"
];
const [occupations] = useState(motherOccupations)
return(
<div>
<main>
<form>
<fieldset>
<legend>Family Details</legend>
<div>
<label htmlFor="father_prefix"> Choose  your Father's Prefix: </label>
<component.Combobox id="father_prefix" name="fatherPrefix" value={ formState.fatherPrefix } options={ selectedPrefix } onChange={ handleChange } />
</div>
<div>
<label htmlFor="father_name"> Full name of the Father:</label>
<component.Input id="father_name" type="text" name="fatherName" value={ formState.fatherName } onChange={ handleChange } />
</div>
<div>
<label htmlFor="father_phone"> Father's Phone Number: </label>
<component.Input id="father_phone" name="fatherPhoneNo" value={ formState.fatherPhoneNo } type="tel" onChange={ handleChange } />
</div>
<div>
<label htmlFor="father_email"> Father's Email Address: </label>
<component.Input id="father_email" name="fatherEmail" value={ formState.fatherEmail } type="email" onChange={ handleChange } />
</div>
<div>
<label htmlFor="father_occupation"> Choose your Father's Occupation: </label>
<component.Combobox id="father_occupation" name="fatherOccupation" value={ formState.fatherOccupation } options={ selectedOccupation } onChange={ handleChange } />
</div>
<div>
<label htmlFor="mother_prefix"> Choose your Mother's prefix:</label>
<component.Combobox id="mother_prefix" name="motherPrefix" value={ formState.motherPrefix } options={ prefixes } onChange={ handleChange } />
</div>
<div>
<label htmlFor="mother_name"> Full Name of the Mother:</label>
<component.Input id="mother_name" name="motherName" value={ formState.motherName } type="text" onChange={ handleChange } />
</div>
<div>
<label htmlFor="mother_phone"> Mother's Phone Number: </label>
<component.Input id="mother_phone" name="motherPhoneNo" value={ formState.motherPhoneNo } type="tel" onChange={ handleChange } />
</div>
<div>
<label htmlFor="mother_email"> Mother's Email Address: </label>
<component.Input id="mother_email" name="motherEmail" value={ formState.motherEmail } type="email" onChange={ handleChange } />
</div>
<div>
<label htmlFor="mother_occupation"> Choose your Mother's Occupation: </label>
<component.Combobox id="mother_occupation" name="motherOccupation" value={ formState.motherOccupation } options={ occupations } onChange={ handleChange } />
</div>
</fieldset>
</form>
</main>
<component.Collapsible title="personal information">
<StudentDetails />
</component.Collapsible>
</div>
);
}
export default FamilyDetails;