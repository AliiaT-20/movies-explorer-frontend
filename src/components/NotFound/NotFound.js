import './NotFound.css';

function NotFound(props) {
    return (
        <section className="not-found">
            <div className="not-found__content">
                <p className="not-found__title">404</p>
                <p className="not-found__text">Страница не найдена</p>
                <button type="button" className="not-found__button">Назад</button>
            </div>
        </section>
    );
  }
  
  export default NotFound;
  