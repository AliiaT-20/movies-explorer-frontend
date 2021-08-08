import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header link = {props.path} />
      <SearchForm />
      <MoviesCardList page = {props.path} />
      <Footer />
    </>
  );
}

export default Movies;
