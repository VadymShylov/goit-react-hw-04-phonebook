import s from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ filter, onFilter }) => {
  return (
    <input className={s.filter}
      type="text"
      name="filter"
      value={filter}
      onChange={onFilter}
      placeholder="Enter name for Search"
    />
  );
};

Filter.propTypes = {
  onSufilterbmit: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;