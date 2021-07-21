import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import findIcon from "../../images/find.svg";

function SearchForm(props) {
  return (
    <section className="search">
        <div className="search__content">
            <form name="search" className="search__form">
                <div className="search__form-wrap">
                    <label className="search__form-field">
                        <input id="film-input" type="text" placeholder="Фильм" name="film" className="search__text" required minLength="2" maxLength="200" />
                        <span className="film-input-error search__text-error"></span>
                    </label>
                    <button type="submit" value="" name="login" className="login__submit-button">
                        <img src= {findIcon} className="search__icon" alt="Иконка лупы" />
                    </button>
                </div>
                <div className="search__checkbox-wrap">
                    <FilterCheckbox />
                </div>
            </form>
        </div>
    </section>
  );
}

export default SearchForm;
