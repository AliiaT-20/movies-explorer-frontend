import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader  from '../Preloader/Preloader';

function MoviesCardList(props) {
  return (
    <>
        <section className="movies-list">
            {props.cards && <Preloader />}
            <div className="movies-list__content">
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
                <MoviesCard saved = {props.page} />
            </div>
        </section>
        {props.page === "/movies" && (
            <section className="more">
                <div className="more__cont">
                    <button className="more__button">Ещё</button>
                </div>
            </section>
        )} 
    </>
  );
}

export default MoviesCardList;
