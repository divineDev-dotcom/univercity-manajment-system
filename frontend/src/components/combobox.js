
const Combobox = ({ label, id, name, value, options, onChange }) => {
  return (
    <div>
      {/* Label for accessibility */}
      <label htmlFor={id}>{label}</label>
      {/* Added id and name attributes */}
      <select id={id} name={name} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Combobox;
