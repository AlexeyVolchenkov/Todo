import './Button.scss'
import clsx from "clsx";

const Button = (props) => {
  const {
    children,
    className,
    clickHandler,
    /*
      'dark-blue' | 'transparent'
     */
    backgroundColor,
  } = props



  return (
    <button
      className={clsx('button', className, {
        [`button--${backgroundColor}`]: backgroundColor,
      })}
      onClick={() => clickHandler(event)}
    >
      {children}
    </button>
  );
};

export default Button;