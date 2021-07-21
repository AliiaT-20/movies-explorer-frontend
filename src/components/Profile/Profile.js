import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
    return (
        <>
        <Header/>
        <section className="profile">
            <div className="profile__content">
                <h3 className="profile__heading">Привет, {props.name}!</h3>
                <form className="profile__form" name = "profile-edit">
                    <label className="profile__form-field">
                        <p className="profile__input-text">Имя</p>
                        <input id="name-input" type="text" value={props.name || ''} placeholder="Имя" name="name" className="form__text" required minLength="2" maxLength="40"/>
                        <span className="name-input-error form__text-error"></span>
                    </label>
                    <div className="profile__line"></div>
                    <label className="profile__form-field">
                    <p className="profile__input-text">Email</p>
                        <input id="email-input" type="email" value={props.email || ''} placeholder="Email" name="email" className="form__text" required minLength="2" maxLength="200" />
                        <span className="email-input-error form__text-error"></span>
                    </label>
                    <button type="submit" value="Редактировать" name="edit" className="profile__submit-button">Редактировать</button>
                </form>
                <button className="profile__button-exit" type="button">Выйти из аккаунта</button>
            </div>
        </section>
        </>
    );
  }
  
  export default Profile;
  