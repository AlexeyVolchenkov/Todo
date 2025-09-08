import './Input.scss'
import clsx from "clsx";

const Input = (props) => {
  const {
    className,
    id,
    placeholder,
    value,
    onChange,
    type,
    icon,
  } = props

  return (
    <>
      <label htmlFor={id} className="visually-hidden">Поиск</label>
      <input
        type={type}
        className={clsx('input', className, {
          [`input--icon-${icon}`]: icon,
        })}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
};

export default Input;