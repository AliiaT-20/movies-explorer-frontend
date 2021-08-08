import './AboutProject.css';

function AboutProject() {
  return (
    <section className="project" id="project">
        <div className="project__content">
            <h2 className="project__title">О проекте</h2>
            <div className="line"></div>
            <div className="project__columns">
                <div className="project__column">
                    <h5 className="project__heading">Дипломный проект включал 5 этапов</h5>
                    <p className="project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="project__column">
                    <h5 className="project__heading">На выполнение диплома ушло 5 недель</h5>
                    <p className="project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="project__deadlines">
                <div className="project__back">
                    <p className="project__back-bar">1 неделя</p>
                    <p className="project__txt">Back-end</p>
                </div>
                <div className="project__front">
                    <p className="project__front-bar">4 недели</p>
                    <p className="project__txt">Front-end</p>
                </div>
            </div>
        </div>
    </section>
  );
}

export default AboutProject;
