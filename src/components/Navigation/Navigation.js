import './Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';
import navIcon from '../../images/header_icon.svg';

const Navigation = (props) => {
    const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
    function openBurger() {
        setIsBurgerOpen(true);
    }
    function closeBurger() {
        setIsBurgerOpen(false);
    }
    return (
        <>
        <div className="navigation__block">
            <Link className="navigation__link" to='/movies'>Фильмы</Link>
            <Link className="navigation__link" to='/saved-movies'>Сохранённые фильмы</Link>
            <Link to="/profile" className="navigation__link">
                <div className="navigation__profile">
                    <p className="navigation__text">Аккаунт</p>
                    <img src = {navIcon} alt="Иконка аккаунта" className="navigation__icon" />
                </div>
            </Link>
        </div>
        <button className={isBurgerOpen ? `burger-btn burger-btn_hide` : `burger-btn`} type="button" onClick={openBurger}></button>
        <div className={isBurgerOpen ? `burger__menu burger__menu_open` : `burger__menu`}>
            <button className="burger-btn__close" type="button" onClick={closeBurger}></button>
            <div className="burger__links">
                <Link className={props.isOpen === "/" ? `burger__link burger__link_open` : `burger__link`} to='/'>Главная</Link>
                <Link className={props.isOpen === "/movies" ? `burger__link burger__link_open` : `burger__link`} to='/movies'>Фильмы</Link>
                <Link className={props.isOpen === "/saved-movies" ? `burger__link burger__link_open` : `burger__link`} to='/saved-movies'>Сохранённые фильмы</Link>
            </div>
            <Link to="/profile" className="burger__link">
                <div className="burger__profile">
                    <p className="burger__text">Аккаунт</p>
                    <img src = {navIcon} alt="Иконка аккаунта" className="burger__icon" />
                </div>
            </Link>
        </div>
        </>
    )
};

export default Navigation;
