import './SavedMovies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  return (
    <>
      <Header link = {props.path} loggedIn = {props.loggedIn} />
      <SearchForm
        onSubmit = {props.handleSearchForm}
        isValid = {props.isValid}
        handleChange = {props.handleChange}
        errors = {props.errors}
      />
      <MoviesCardList
        page = {props.path}
        cards = {props.moviesOnPage}
        saveCard = {props.handleSaveCard}
        havingFilms = {props.haveFilms}
      />
      <Footer />
    </>
  );
}

export default SavedMovies;
