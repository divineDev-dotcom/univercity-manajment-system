import React, { useState, useEffect } from 'react';

const Checkbox = ({ label, checked, onChange, ...rest }) => {
  const [isChecked, setIsChecked] = useState(!!checked);

  useEffect(() => {
    setIsChecked(!!checked);
  }, [checked]);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    if (typeof onChange === 'function') {
      onChange(event.target.checked);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${label}`}
        checked={isChecked}
        onChange={handleChange}
        {...rest}
      />
      <label htmlFor={`checkbox-${label}`}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
