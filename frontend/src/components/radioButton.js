const RadioButton = ({ id, name, value, label, onChange, checked }) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event); // Pass the full event to the parent
    }
  };

  return (
    <div>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange} // Event passed here
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioButton;
