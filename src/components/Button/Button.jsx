import './Button.scss'

const Button = (props) => {
  const {
    children,
    setTheme,
  } = props

  const clickHandler = (event) => {
    const isLight = event.target.textContent.toLowerCase() === 'light'

    setTheme(isLight ? 'Light': 'Dark')
  }

  return (
    <button
      className='button'
      onClick={() => clickHandler(event)}
    >
      {children}
    </button>
  );
};

export default Button;