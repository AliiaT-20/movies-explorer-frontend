import './AboutMe.css';
import photo from "../../images/my-photo.jpg"

function AboutMe() {
  return (
    <section className="student" id="student">
        <div className="student__content">
            <h2 className="student__title">Студент</h2>
            <div className="line"></div>
            <div className="student__container">
                <div className="student__column">
                    <div className="student__about">
                        <h5 className="student__heading">Алия</h5>
                        <p className="student__subtitle">Фронтенд-разработчик, 22 года</p>
                        <p className="student__aboutme">Меня зовут Алия Троицкая, я начинающий frontend-разработчик. Я закончила курсы Web-разработки в Яндекс.Практикуме, где изучила вёрстку, JS, React и основы бекэнда на Node.js. Теперь продолжаю самостоятельно совершенствовать свои навыки JS и React. Мне нравится веб-разработка, потому что в ней не существует границ, можно делать проекты и наглядно видеть результат. </p>
                    </div>
                    <div className="student__links">
                        <a href="https://www.instagram.com/aliia.t_" target="_blank" className="student__link" rel="noopener noreferrer">Instagram</a>
                        <a href="https://github.com/AliiaT-20" target="_blank" className="student__link" rel="noopener noreferrer">Github</a>
                    </div>
                </div>
                <div className="student__photo">
                    <img src= {photo} alt="Фото студента" className="student__photo-img" />
                </div>
            </div>
        </div>
    </section>
  );
}

export default AboutMe;
