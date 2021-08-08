import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="tech">
        <div className="techs__content">
            <h2 className="techs__title">Технологии</h2>
            <div className="techs__line"></div>
            <div className="techs__container">
                <h5 className="techs__heading">7 технологий</h5>
                <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className="techs__items">
                    <p className="techs__item">HTML</p>
                    <p className="techs__item">CSS</p>
                    <p className="techs__item">JS</p>
                    <p className="techs__item">React</p>
                    <p className="techs__item">Git</p>
                    <p className="techs__item">Express.js</p>
                    <p className="techs__item">mongoDB</p>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Techs;
