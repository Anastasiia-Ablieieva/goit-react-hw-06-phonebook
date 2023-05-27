import PropTypes from 'prop-types';
import css from './ContactFilter.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

    return (
        <label className={css.label} >
          Find contacts by name
          <input
            type="text"
            className={css.input} 
            value={filter} 
            onChange={e => dispatch(setFilter(e.currentTarget.value))}
          />
        </label>
    );
  }

  Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };
  