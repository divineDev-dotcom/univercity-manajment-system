const RadioButton = ({ id, name, value, label, onChange, checked }) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div>
      <input
        type="radio"
        id={id} // id should be passed as a prop for uniqueness
        name={name}
        value={value}
        checked={checked} // The parent component controls the checked state
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label> {/* Correctly associates label with input */}
    </div>
  );
};

export default RadioButton;
