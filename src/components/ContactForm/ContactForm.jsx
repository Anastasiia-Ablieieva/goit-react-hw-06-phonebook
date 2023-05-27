import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import css from './ContactForm.module.css';
import { addContact } from 'redux/contactsSlice';


const ContactSchema = Yup.object().shape(
    {
        name: Yup.string()
        .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
            'Name may contain only letters, apostrophe, dash and spaces').required('Required!'),
        number: Yup.string()
        .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
            'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +').required('Required!'),
    }
);

export const ContactForm = () => {

    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        const newContact = {
            id: nanoid(), 
            name: e.currentTarget.elements.name.value,
            number: e.currentTarget.elements.number.value,
        };

        const isExist = contacts.find(
            ({ name }) => name.toLowerCase() === newContact.name.toLowerCase());

        if (isExist) {
            return alert(`A contact ${newContact.name} is already in contacts.`);
            // return <p>A contact with that name already exists.</p>;
        }

        dispatch(addContact(newContact));

        e.currentTarget.reset(); 
      };



    return (
    <Formik
        initialValues={{name: '', number: ''}}
        validationSchema={ContactSchema}>
        <Form className={css.formFild} onSubmit={handleSubmit}>
        <label className={css.lable}>
            Name
            <Field className={css.field} name="name" type="text"/>
            <ErrorMessage style={{color: '#0c30b1', fontSize: 15, width: 400}} name="name" component="span"/>
        </label>
        <label className={css.lable}>
            Number
            <Field className={css.field} name="number" type="tel"/>
            <ErrorMessage style={{color: '#0c30b1', fontSize: 15, width: 400}} name="number" component="span"/>
        </label>
        <button className={css.button} type="submit">Add contact</button>
      </Form>
    </Formik>
    )
}

ContactForm.propType = {
    onSubmit: PropTypes.func.isRequired,
  };