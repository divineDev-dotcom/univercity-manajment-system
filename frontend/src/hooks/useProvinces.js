import { useState, useEffect } from 'react';

const UseProvinces = (countries) => {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    if (!countries) return; // Don't fetch if no country is selected

    const fetchProvinces = async () => {
      try {
        const response = await fetch(https://www.universal-tutorial.com/api/states/${countries}, {
          headers: {
            'Authorization': 'Bearer T1b-7blZGHtWHKKav4Epq5R_1GkL6EdGqLbpmvO5fCJftDQ8WLkrGLcPpH6MhMu5hzc',
            'Accept': 'application/json'
          }
        });
        
        const data = await response.json();
        console.log(data); // Check what data looks like
        
        if (Array.isArray(data)) { // Ensure data is an array
          setProvinces(data);
        } else {
          console.error('Unexpected data structure:', data);
        }

      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, [countries]);

  return provinces;
}

export default UseProvinces;