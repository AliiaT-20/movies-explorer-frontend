import './Login.css';
import logo from "../../images/logo.svg"
import Form from '../Form/Form';
import React from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function Login(props) {
    return (
        <section className="login">
            <div className="login__content">
                <Link to="/">
                    <img src= {logo} alt="Логотип" className="login__logo" />
                </Link>
                <h3 className="login__title">Рады видеть!</h3>
                {props.onPreloader ? (<Preloader />) : (
                    <Form name="login" buttonText="Войти" onSubmit = {props.onLogin} isValid = {props.isValid} apiErrorVisible = {props.apiErrorVisible} apiErrorText = {props.apiErrorText}>
                        <label className="login__form-field">
                            <p className="login__input-text">Email</p>
                            <input onChange = {props.handleChange} id="email-input" type="email" name="email" className="login__form-text" required minLength="2" maxLength="200"/>
                            <span className={props.errors.email ? "name-input-error login__form-text-error login__form-text-error_active" : "name-input-error login__form-text-error"}>{props.errors.email}</span>
                        </label>
                        <label className="login__form-field">
                            <p className="login__input-text">Пароль</p>
                            <input onChange = {props.handleChange} id="password-input" type="password" name="password" className="login__form-text" required minLength="8" maxLength="40"/>
                            <span className={props.errors.password ? "name-input-error login__form-text-error login__form-text-error_active" : "name-input-error login__form-text-error"}>{props.errors.password}</span>
                        </label>
                    </Form>
                )}
                <p className="login__postForm-text">Ещё не зарегистрированы? <Link className="login__link" to="/signup">Регистрация</Link></p>
            </div>
        </section>
    );
  }
  
  export default Login;
  