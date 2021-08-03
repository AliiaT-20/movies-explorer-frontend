import './MoviesCard.css';

function MoviesCard(props) {
  function countingHours(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'мин';
  }
  function saveMovies() {
    props.handleSaveCard(props.card)
  }
  return (
    <>
    {props.saved === '/movies' ? (
      <div className="card">
        <a className="card__link" href= {props.trailerLink} target="_blank" rel="noreferrer">
          <img src= {"https://api.nomoreparties.co" + props.movieImage} className="card__image" alt="Обложка фильма" />
        </a>
        <div className="card__info">
            <div className="card__text-content">
                <h5 className="card__title">{props.movieTitle}</h5>
                <p className="card__duration">{countingHours(props.movieDuration)}</p>
            </div>
            {props.saved === "/movies" ? (<button type="button" onClick = {saveMovies} className={props.save ? "card__save-btn card__save-btn_active" : "card__save-btn"}></button>) : (<button className="card__delete-save-button"></button>)}
        </div>
    </div>
    ) : (
      <div className="card">
        <a className="card__link" href= {props.trailerLink} target="_blank" rel="noreferrer">
          <img src= {props.movieImage} className="card__image" alt="Обложка фильма" />
        </a>
        <div className="card__info">
            <div className="card__text-content">
                <h5 className="card__title">{props.movieTitle}</h5>
                <p className="card__duration">{countingHours(props.movieDuration)}</p>
            </div>
            {props.saved === "/movies" ? (<button type="button" onClick = {saveMovies} className={props.save ? "card__save-btn card__save-btn_active" : "card__save-btn"}></button>) : (<button className="card__delete-save-button" type="button" onClick = {saveMovies}></button>)}
        </div>
    </div>
    )}
    </>
  );
}

export default MoviesCard;
