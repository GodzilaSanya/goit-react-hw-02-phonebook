import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
// import PhoneBook from './PhoneBook/PhoneBook';

import css from './app.module.css';

class App extends Component {
  // state = {
  //   contacts: [],
  //   filter: '',
  // };

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filteredContacts: [],
    filter: '',
  };

  fetchContact = contact => {
    const currentContacts = this.state.contacts;
    this.setState({
      contacts: [...currentContacts, { id: nanoid(), ...contact }],
    });
  };
  deleteContact = id => {
    const contactList = this.state.contacts;
    const newList = contactList.filter(contact => contact.id !== id);
    this.setState({ contacts: newList });
    //видалення в фільтрах. Треба оптимізувати
    const filterList = this.state.filteredContacts;
    const newFilteredList = filterList.filter(contact => contact.id !== id);
    this.setState({ filteredContacts: newFilteredList });
  };

  findContact = value => {
    this.setState({ filter: `${value}` });
    const contactList = this.state.contacts;
    // contactList.filter(contact => contact.name.includes(value));
    const result = contactList.filter(contact =>
      contact.name.toLowerCase().includes(value)
    );
    this.setState({ filteredContacts: result });

    console.log(value);
    console.log(result);
  };
  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        {/* <PhoneBook /> */}
        <ContactForm fetchContact={this.fetchContact} />
        <h2>Contacts</h2>
        <Filter findContact={this.findContact} />
        <ContactList
          contactlist={
            !this.state.filter
              ? this.state.contacts
              : this.state.filteredContacts
          }
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
