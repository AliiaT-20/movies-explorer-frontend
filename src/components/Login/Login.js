import './Login.css';
import logo from "../../images/logo.svg"
import Form from '../Form/Form';

function Login(props) {
    return (
        <section className="login">
            <div className="login__content">
                <img src= {logo} alt="Логотип" className="login__logo" />
                <h3 className="login__title">Рады видеть!</h3>
                <Form name="login" buttonText="Войти">
                    <label className="login__form-field">
                        <p className="login__input-text">Email</p>
                        <input id="email-input" type="email" name="email" className="login__form-text" required minLength="2" maxLength="200"/>
                        <span className="name-input-error login__form-text-error"></span>
                    </label>
                    <label className="login__form-field">
                        <p className="login__input-text">Пароль</p>
                        <input id="password-input" type="password" name="password" className="login__form-text" required minLength="8" maxLength="40"/>
                        <span className="name-input-error login__form-text-error"></span>
                    </label>
                </Form>
                <p className="login__postForm-text">Ещё не зарегистрированы? <a className="login__link" href="/signup">Регистрация</a></p>
            </div>
        </section>
    );
  }
  
  export default Login;
  