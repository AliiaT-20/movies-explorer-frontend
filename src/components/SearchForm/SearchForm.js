import './SearchForm.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import findIcon from "../../images/find.svg";

function SearchForm(props) {
    return (
        <section className="search">
            <div className="search__content">
                <form name="search" className="search__form" onSubmit = {props.onSubmit} noValidate>
                    <div className="search__form-wrap">
                        <label className="search__form-field">
                            <input onChange = {props.handleChange} id="film-input" type="text" placeholder="Фильм" name="film" className="search__text" required maxLength="200" />
                            <span className={props.errors.film ? "film-input-error search__text-error search__text-error_active" : "film-input-error search__text-error"}>{props.errors.film}</span>
                        </label>
                        <button type="submit" value="" name="login" className="login__submit-button">
                            <img src= {findIcon} className="search__icon" alt="Иконка лупы" />
                        </button>
                    </div>
                    <div className="search__checkbox-wrap">
                        <FilterCheckbox filtred = {props.handleFiltredMovies} />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SearchForm;
