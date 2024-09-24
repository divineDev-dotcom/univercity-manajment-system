const Input = ({
  id,
  label,
name,
  type = "text",
  value,
  onChange,
  required = true
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
name={name }
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;