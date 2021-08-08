import './Header.css';
import headerLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header(props) {
    return (
        <header className={`header ${props.unlog}`}>
            <div className="header__content">
            <img src= {headerLogo} alt="Логотип" className="header__logo" />
                {props.link === '/' ? (
                <div className="header__block">
                    <Link to="/signup" className="header__button header__button_reg">Регистрация</Link>
                    <Link to="/signin" className="header__button header__button_sign-out">Войти</Link>
                </div>) : (<Navigation isOpen = {props.link} />)}
            </div>
        </header>
    );
  }
  
  export default Header;
  