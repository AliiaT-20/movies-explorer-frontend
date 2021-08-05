import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <div className="filter-check-box">
        <p className="filter-check-box__text">Короткометражки</p>
        <label className="filter-check-box__checkbox-wrap">
            <input type="checkbox" onChange = {props.filtred} id="film-checkbox" className="filter-check-box__checkbox" name="checkbox" />
            <span for="film-checkbox" className="filter-check-box__label"></span>
        </label>
    </div>
  );
}

export default FilterCheckbox;
