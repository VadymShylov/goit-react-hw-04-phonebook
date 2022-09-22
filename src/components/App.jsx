import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

function App() {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts
    );
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = data => {
    if (contacts.some(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    setContacts(contacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [newContact, ...contacts];
    });
    setName('');
    setNumber('');
  };
  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const handleDeleteContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const getVisibleContacts = (contacts, filter) => {
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  return (
    <>
      <ContactForm onSubmit={handleAddContact} name={name} number={number} />
      <ContactList
        contacts={getVisibleContacts(contacts, filter)}
        onRemove={handleDeleteContact}
      >
        <Filter onFilter={handleFilterChange} />
      </ContactList>
    </>
  );
}

export default App;