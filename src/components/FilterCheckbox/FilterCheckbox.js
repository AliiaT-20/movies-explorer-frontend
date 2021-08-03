import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <div className="filter-check-box">
        <p className="filter-check-box__text">Короткометражки</p>
        <div className="filter-check-box__checkbox-wrap">
            <input type="checkbox" onChange = {props.onChange} id="film-checkbox" className="filter-check-box__checkbox" name="checkbox" />
            <label for="film-checkbox" className="filter-check-box__label"></label>
        </div>
    </div>
  );
}

export default FilterCheckbox;
