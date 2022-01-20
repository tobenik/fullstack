import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNewNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  };

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      if (window.confirm(
        `${newName} is already added to the phonebook, replace old number with new one?`
      )) {
        const currPerson = persons.filter((p) => p.name == newName);
        const updatedPerson = {
          name: currPerson[0].name,
          number: newNumber,
          id: currPerson[0].id,
        };

        personService
          .update(updatedPerson)
          .then((changedPerson) => {
            setPersons(
              persons.map((p) => p.name != newName ? p : changedPerson)
            );
            setNewName('');
            setNewNumber('');
            setNewNotification(`Number of ${changedPerson.name} changed succesfully!`)
            setTimeout(() => {
              setNewNotification(null)
            }, 3000)
            console.log('number changed!');
          })
          .catch(error =>{
            console.log(error);
            setNewNotification(`Error: ${currPerson[0].name} was already removed from the server.`)
            setTimeout(() => {
              setNewNotification(null)
            }, 3000)
          });
        return;
      } else {
        //Do nothing
        return;
      }
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    //Add person to backend server
    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setNewNotification(`${newPerson.name} added successully!`)
        setTimeout(() => {
          setNewNotification(null)
        }, 3000)
        console.log('person added!')
      })
  };

  const delPerson = (id) => {
    if (window.confirm(`Delete ${persons.find((p) => p.id == id).name}?`)) {
      //Delete person
      personService
        .del(id)
        .then(() => {
          let copy = persons
          copy = copy.filter((person) => person.id != id)
          setPersons(copy)
          console.log('person deleted!');
        }
        )
    } else {
      //Do nothing
      return;
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <Notification
        message={notification}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        newFilter={newFilter}
        delPerson={delPerson} 
      />
    </div>
  )
};

const Notification = ({ message }) => {
  if (message === null){
    return null;
  };

  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 14,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message.includes("Error")){
    messageStyle.color = "red"
  };

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export default App