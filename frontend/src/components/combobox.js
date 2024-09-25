
const Combobox = ({ label, id, name, options, onChange }) => {
  return (
    <div>
      {/* Label for accessibility */}
      <label htmlFor={id}>{label}</label>
      {/* Added id and name attributes */}
      <select id={id} name={name} onChange={onChange}>
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
