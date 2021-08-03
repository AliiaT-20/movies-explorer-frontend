import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import React from 'react';

function MoviesCardList(props) {
    return (
        <>
        {props.page === '/movies' && (
            <>
            <section className="movies-list">
                <div className="movies-list__content">
                    {props.onPreloader && (<Preloader />)}
                    {props.cards.map((card) => {
                        return (
                        <MoviesCard 
                            movieTitle = {card.nameRU}
                            film = {card}
                            key = {card.id}
                            save = {props.savedFilms.some((item) => {
                                return item.movieId === card.id
                            })}
                            movieImage = {card.image.url}
                            movieDuration = {card.duration}
                            trailerLink = {card.trailerLink}
                            saved = {props.page}
                            handleSaveCard = {props.saveCard}
                            card = {card}
                        />)
                    }).slice(0, props.cardsLength)}
                </div>
                {!props.havingFilms && (<h5 className="movies-list__title-notfound">Ничего не найдено :(</h5>)}
                {props.error && (<h5 className="movies-list__title-notfound">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h5>)}
            </section>
            {props.cards.length > props.cardsLength && (
                <section className="more">
                    <div className="more__cont">
                        <button className="more__button" type ="button" onClick = {props.addClick}>Ещё</button>
                    </div>
                </section>
            )}
            </>
        )}
        {props.page === '/saved-movies' && (
           <>
           <section className="movies-list">
               <div className="movies-list__content">
                   {props.cards.map((card) => {
                       return (
                       <MoviesCard 
                           movieTitle = {card.nameRU}
                           film = {card}
                           key = {card._id}
                           save = {true}
                           movieImage = {card.image}
                           movieDuration = {card.duration}
                           trailerLink = {card.trailer}
                           saved = {props.page}
                           handleSaveCard = {props.saveCard}
                           card = {card}
                       />)
                   })}
               </div>
               {!props.havingFilms && (<h5 className="movies-list__title-notfound">Ничего не найдено :(</h5>)}
           </section>
           </> 
        )}  
        </>
    );
}

export default MoviesCardList;
