import './NotFound.css';
import { useHistory } from 'react-router-dom';

function NotFound(props) {
    const history = useHistory();
    function handleBack() {
        history.goBack();
    }
    return (
        <section className="not-found">
            <div className="not-found__content">
                <p className="not-found__title">404</p>
                <p className="not-found__text">Страница не найдена</p>
                <button type="button" className="not-found__button" onClick = {handleBack}>Назад</button>
            </div>
        </section>
    );
  }
  
  export default NotFound;
  