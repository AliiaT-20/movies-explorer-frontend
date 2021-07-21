import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
        <div className="footer__content">
           <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
           <div className="footer__line"></div>
           <div className="footer__box">
               <p class="footer__copyright">&copy; 2021</p>
               <ul className="footer__links">
                    <li className="footer__list-item"><a className="footer__link" href="https://praktikum.yandex.ru/profile/web/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a></li>
                    <li className="footer__list-item"><a className="footer__link" href="https://github.com/" target="_blank" rel="noopener noreferrer">Github</a></li>
                    <li className="footer__list-item"><a className="footer__link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
               </ul>
           </div>
        </div>
    </footer>
  );
}

export default Footer;
