import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <div className="card">
        <div className="card__image" />
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
