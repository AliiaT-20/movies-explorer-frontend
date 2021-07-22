import './MoviesCard.css';
import filmImage from "../../images/film.jpg"

function MoviesCard(props) {
  return (
    <div className="card">
        <img src= {filmImage} className="card__image" alt="Обложка фильма" />
        <div className="card__info">
            <div className="card__text-content">
                <h5 className="card__title">33 слова о дизайне</h5>
                <p className="card__duration">1ч42м</p>
            </div>
            {props.saved === "/movies" ? (<button className="card__save-btn"></button>) : (<button className="card__delete-save-button"></button>)}
        </div>
    </div>
  );
}

export default MoviesCard;
