import './Form.css';

function Form(props) {
    return (
        <form className="form" name = {props.name}>
            {props.children}
            <button type="submit" name= {props.name} className="form__submit-button">{props.buttonText}</button>
        </form>
    );
}
  
export default Form;
  