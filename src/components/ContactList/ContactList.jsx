import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = () => {
    
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    const filteredContacts = contacts?.filter(contact =>
        contact?.name?.toLowerCase().includes(filter.toLowerCase())
    );

    const onDeleteContact = id => {
        dispatch(deleteContact(id));
    };

    if (!filteredContacts?.length) {
        return <p>No contacts... 🤷‍♀️ </p>;
    };

    return (
        <ul className={css.contactList}>
            {filteredContacts.map(({ id, name, number }) => {
                return(
                    <li className={css.contactItem} 
                        key={id}> 
                        <span>{name}: {number}</span>
                        <button className={css.button} type="button" onClick={() => onDeleteContact(id)}>Delete</button>
                    </li>
                )
            })}
        </ul>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }).isRequired
    )
};