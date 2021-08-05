import './Register.css';
import logo from "../../images/logo.svg"
import Form from '../Form/Form';
import React from 'react';
import Preloader from '../Preloader/Preloader';

function Register(props) {
    return (
        <section className="register">
            <div className="register__content">
                <img src= {logo} alt="Логотип" className="register__logo" />
                <h3 className="register__title">Добро пожаловать!</h3>
                {props.onPreloader ? (<Preloader />) : (
                    <Form name="register" buttonText="Зарегистрироваться" onSubmit = {props.onRegister} isValid = {props.isValid} apiErrorVisible = {props.apiErrorVisible} apiErrorText = {props.apiErrorText}>
                        <label className="register__form-field">
                            <p className="register__input-text">Имя</p>
                            <input onChange = {props.handleChange} id="name-input" type="text" name="name" className="register__form-text" required minLength="2" maxLength="40"/>
                            <span className={props.errors.name ? "name-input-error register__form-text-error register__form-text-error_active" : "name-input-error register__form-text-error"}>{props.errors.name}</span>
                        </label>
                        <label className="register__form-field">
                            <p className="register__input-text">Email</p>
                            <input onChange = {props.handleChange} id="email-input" type="email" name="email" className="register__form-text" required minLength="2" maxLength="200"/>
                            <span className={props.errors.email ? "name-input-error register__form-text-error register__form-text-error_active" : "name-input-error register__form-text-error"}>{props.errors.email}</span>
                        </label>
                        <label className="register__form-field">
                            <p className="register__input-text">Пароль</p>
                            <input onChange = {props.handleChange} id="password-input" type="password" name="password" className="register__form-text" required minLength="8" maxLength="40"/>
                            <span className={props.errors.password ? "name-input-error register__form-text-error register__form-text-error_active" : "name-input-error register__form-text-error"}>{props.errors.password}</span>
                        </label>
                    </Form>
                )}
                <p className="register__postForm-text">Уже зарегистрированы? <a className="register__link" href="/signin">Войти</a></p>
            </div>
        </section>
    );
  }
  
  export default Register;
  