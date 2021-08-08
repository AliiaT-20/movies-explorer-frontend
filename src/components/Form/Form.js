import './Form.css';

function Form(props) {
    return (
        <form className="form" name = {props.name} onSubmit = {props.onSubmit} noValidate>
            {props.children}
            <p className={props.apiErrorVisible ? "form__error form__error_visible " : "form__error"}>{props.apiErrorText}</p>
            <button type="submit" name= {props.name} className={props.isValid ? "form__submit-button" : "form__submit-button form__submit-button_disabled"} disabled = {props.isValid ? false : true}>{props.buttonText}</button>
        </form>
    );
}
  
export default Form;
  