import { useState } from 'react';
import css from './ContactForm.module.css';

const ContactForm = ({ createUser }) => {
  // const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = ({ target: { name, value } }) => {
    if (name === 'name') setName(value);
    else if (name === 'number') setNumber(value);

    // switch (value) {
    //   case 'name':
    //     setName(value);
    //     break;
    //   case 'number':
    //     setNumber(value);
    //     break;

    //   default:
    //     break;
    // }
  };

  const handleSubmit = e => {
    e.preventDefault();

    createUser({
      name,
      number,
    });
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} autoComplete="off" onSubmit={handleSubmit}>
      <label className={css['label-name']}>
        <span className={css['label-text']}>Name</span>

        <input
          className={css.input}
          value={name}
          type="text"
          name="name"
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css['label-number']}>
        <span className={css['label-text']}>Number</span>

        <input
          className={css.input}
          value={number}
          type="tel"
          name="number"
          onChange={handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css['btn-add']}>Add contact</button>
    </form>
  );
};

export default ContactForm;
