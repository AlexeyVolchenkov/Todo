import './Select.scss'

const Select = (props) => {
  const {
    id,
    options,
    value,
    onChange,
  } = props

  return (
    <select
      id={id}
      className="select"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map(({ value, id, name }) => (
        <option key={id} value={value} className="select__option">{name}</option>
      ))}
    </select>
  );
};

export default Select;