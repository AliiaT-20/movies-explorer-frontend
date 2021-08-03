import './Profile.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Profile(props) {
    const history = useHistory();
    function signOut() {
        localStorage.removeItem('jwt');
        history.push('/signin');
    }
    return (
        <>
        <Header/>
        <section className="profile">
            <div className="profile__content">
                <h3 className="profile__heading">Привет, {props.name}!</h3>
                <form className="profile__form" name = "profile-edit" onSubmit = {props.handleUpdateProfile}>
                    <label className="profile__form-field">
                        <p className="profile__input-text">Имя</p>
                        <input onChange = {props.handleChange} placeholder = {props.name} id="name-input" type="text" name="name" className="form__text" required minLength="2" maxLength="40"/>
                        <span className={props.errors.name ? "name-input-error form__text-error form__text-error_active" : "name-input-error form__text-error"}>{props.errors.name}</span>
                    </label>
                    <div className="profile__line"></div>
                    <label className="profile__form-field">
                    <p className="profile__input-text">Email</p>
                        <input onChange = {props.handleChange} placeholder = {props.email} id="email-input" type="email" name="email" className="form__text" required minLength="2" maxLength="200" />
                        <span className={props.errors.email ? "email-input-error form__text-error form__text-error_active" : "email-input-error form__text-error"}>{props.errors.email}</span>
                    </label>
                    <button type="submit" value="Редактировать" name="edit" className={props.errors.name === '' && props.errors.email === '' ? "profile__submit-button" : "profile__submit-button profile__submit-button_disabled"}>Редактировать</button>
                </form>
                <button className="profile__button-exit" type="button" onClick={signOut}>Выйти из аккаунта</button>
            </div>
        </section>
        <InfoTooltip
            isOpen = {props.isInfoTooltipOpen}
            image = {props.imageInfoTooltip}
            text = {props.textInfoTooltip}
            onClose = {props.handleInfoTooltipClose} />
        </>
    );
  }
  
  export default Profile;
  