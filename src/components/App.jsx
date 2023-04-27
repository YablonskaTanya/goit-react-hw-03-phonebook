import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './ContactForm /ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const LOCAL_STORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
    }

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(this.state.contacts)
    );
  }

  formSubmitHendler = data => {
    console.log(data);
    const id = nanoid();
    const name = data.name;
    const number = data.number;
    const contactsLists = this.state.contacts;

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number });
    }

    this.setState({ contacts: contactsLists });
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleFilter = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getVisibleFilter();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '500px',
          marginTop: '50px',
          backgroundColor: '#b4d6f5',
          borderRadius: '8px',
          padding: '40px 20px',
        }}
      >
        <h1 className={css.phohebookTitle}> Phonebook</h1>
        <ContactForm propOnSubmit={this.formSubmitHendler} />
        <h2 className={css.contactsTitle}>Contacts</h2>
        <Filter value={filter} OnChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContacts}
        />
      </div>
    );
  }
}
