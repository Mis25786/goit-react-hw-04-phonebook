import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const createUser = data => {
    if (contacts.find(contact => contact.name === data.name)) {
      return Notify.info('This name already exists in the list');
    }
    setContacts(prevContacts => [...prevContacts, { ...data, id: nanoid() }]);
  };

  const cangeFilter = e => {
    setFilter(e.target.value);
  };
  //  const cangeFilter = ({ target: { value } }) => {
  //    setFilter(value);
  //  };

  const getVisibleContacts = () => {
    const normalizeFilterContact = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilterContact)
    );
  };

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    console.log('contacts :>> ', contacts);
    console.log('parsedContacts :>> ', parsedContacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <div className={css.phonebook}>
        <h1 className={css['phonebook-title']}>Phonebook</h1>

        <ContactForm createUser={createUser} />

        <h2>Contacts</h2>

        <Filter filter={filter} cangeFilter={cangeFilter} />

        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </>
  );
};

//=====================================================================

// import { Component } from 'react';
// import { nanoid } from 'nanoid';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import ContactForm from './ContactForm';
// import Filter from './Filter';
// import ContactList from './ContactList';

// import css from './App.module.css';

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   createUser = data => {
//     this.setState(prevState => {
//       if (prevState.contacts.find(contact => contact.name === data.name)) {
//         return Notify.info('This name already exists in the list');
//       }
//       return { contacts: [...prevState.contacts, { ...data, id: nanoid() }] };
//     });
//   };

//   cangeFilter = e => {
//     this.setState({ filter: e.target.value });
//   };

//   getVisibleContacts = () => {
//     const normalizeFilterContact = this.state.filter.toLowerCase();

//     return this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilterContact)
//     );
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     console.log('parsedContacts :>> ', parsedContacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { filter } = this.state;

//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <>
//         <div className={css.phonebook}>
//           <h1 className={css['phonebook-title']}>Phonebook</h1>

//           <ContactForm createUser={this.createUser} />

//           <h2>Contacts</h2>

//           <Filter filter={filter} cangeFilter={this.cangeFilter} />

//           <ContactList
//             contacts={visibleContacts}
//             onDeleteContact={this.deleteContact}
//           />
//         </div>
//       </>
//     );
//   }
// }
