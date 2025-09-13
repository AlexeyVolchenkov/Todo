import './Header.scss'
import Button from "@/components/Button";
import {useContext} from "react";
import {ThemeContext} from "@/App";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const { theme, switchTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  return (
    <div className="header container">
      <div className="header__inner">
        <div className="header__actions">
          <Button
            clickHandler={() => navigate('/')}
            backgroundColor="transparent"
            className="header__actions-button-back"
          >
            Назад
          </Button>
          <Button
            clickHandler={switchTheme}
            backgroundColor="transparent"
            className="header__actions-button-theme"
          >
            {theme.toLowerCase() === 'light' ? (<span>Dark</span>) : (<span>Light</span>)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;