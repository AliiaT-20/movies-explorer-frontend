import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab">
        <div className="nav-tab__content">
            <ul className="nav-tab__links">
                <li><a className="nav-tab__link" href="#project">О проекте</a></li>
                <li><a className="nav-tab__link" href="#tech">Технологии</a></li>
                <li><a className="nav-tab__link" href="#student">Студент</a></li>
            </ul>
        </div>
    </section>
  );
}

export default NavTab;
