import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import React from 'react';

function Movies(props) {
  return (
    <>
      <Header link = {props.path} />
      <SearchForm
        onSubmit = {props.handleSearchForm}
        isValid = {props.isValid}
        handleChange = {props.handleChange}
        errors = {props.errors}
      />
      <MoviesCardList
        addClick = {props.handleAddCards}
        cards = {props.moviesOnPage}
        cardsLength = {props.cardsLength}
        onPreloader = {props.isPreloader}
        havingFilms = {props.haveFilms}
        error = {props.error}
        page = {props.path}
        saveCard = {props.handleSaveCard}
        savedFilms = {props.savedMovies}
      />
      <Footer />
    </>
  );
}

export default Movies;
