import React from 'react';

const combobox = ({ label, options, onChange }) => {
return (
<div>
<label>{label}</label>
<select onChange={onChange}>
{options.map((option, index) => (
<option key={index} value={option}>
{option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default combobox;
