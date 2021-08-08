import './Portfolio.css';
import icon from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
        <div className="portfolio__content">
            <h2 className="portfolio__title">Портфолио</h2>
            <a href="https://github.com/AliiaT-20/how-to-learn" className="portfolio__link-block" target="_blank" rel="noopener noreferrer">
                <div className="portfolio__link">
                    <p className="portfolio__link-txt">Статичный сайт</p>
                    <img className="portfolio__icon" src= {icon} alt="Иконка стрелочки" />
                </div>
            </a>
            <a href="https://github.com/AliiaT-20/russian-travel" className="portfolio__link-block" target="_blank" rel="noopener noreferrer">
                <div className="portfolio__link">
                        <p className="portfolio__link-txt">Адаптивный сайт</p>
                        <img className="portfolio__icon" src= {icon} alt="Иконка стрелочки" />
                    </div>
                </a>
            <a href="https://github.com/AliiaT-20/react-mesto-api-full" className="portfolio__link-block" target="_blank" rel="noopener noreferrer">
                <div className="portfolio__link">
                    <p className="portfolio__link-txt">Одностраничное приложение</p>
                    <img className="portfolio__icon" src= {icon} alt="Иконка стрелочки" />
                </div>
            </a>
        </div>
    </section>
  );
}

export default Portfolio;
