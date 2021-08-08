import './Register.css';
import logo from "../../images/logo.svg"
import Form from '../Form/Form';

function Register(props) {
    return (
        <section className="register">
            <div className="register__content">
                <img src= {logo} alt="Логотип" className="register__logo" />
                <h3 className="register__title">Добро пожаловать!</h3>
                <Form name="register" buttonText="Зарегистрироваться">
                    <label className="register__form-field">
                        <p className="register__input-text">Имя</p>
                        <input id="name-input" type="text" name="name" className="register__form-text" required minLength="2" maxLength="40"/>
                        <span className="name-input-error register__form-text-error"></span>
                    </label>
                    <label className="register__form-field">
                        <p className="register__input-text">Email</p>
                        <input id="email-input" type="email" name="email" className="register__form-text" required minLength="2" maxLength="200"/>
                        <span className="name-input-error register__form-text-error"></span>
                    </label>
                    <label className="register__form-field">
                        <p className="register__input-text">Пароль</p>
                        <input id="password-input" type="password" name="password" className="register__form-text" required minLength="8" maxLength="40"/>
                        <span className="name-input-error register__form-text-error"></span>
                    </label>
                </Form>
                <p className="register__postForm-text">Уже зарегистрированы? <a className="register__link" href="/signin">Войти</a></p>
            </div>
        </section>
    );
  }
  
  export default Register;
  