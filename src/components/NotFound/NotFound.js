import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound(props) {
    return (
        <section className="not-found">
            <div className="not-found__content">
                <p className="not-found__title">404</p>
                <p className="not-found__text">Страница не найдена</p>
                <Link className="not-found__button" onClick = {props.goBack}>Назад</Link>
            </div>
        </section>
    );
  }
  
  export default NotFound;
  