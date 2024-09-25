import { useEffect, useState} from 'react';

const UseCountries = () => {
const [countries, setCountries] = useState([]);
useEffect(() => {
const fetchCountries = async () => {
try{
const response = await fetch('https://restcountries.com/v3.1/all');
const data = await response.json();
        const countryOptions = data.map((country) => country.name.common).sort((a, b) => a.localeCompare(b)); 
setCountries(countryOptions);
}
catch (error) {
        console.error('Error fetching countries:', error);
}
};
fetchCountries();
}, []

);
  return countries; // Return the countries list
}
export default UseCountries;
