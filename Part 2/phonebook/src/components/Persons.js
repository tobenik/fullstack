import React from 'react'

const Persons = ({ persons, newFilter, delPerson }) => {
  return (
    <ul>
      {persons.map((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()) ?
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => delPerson(person.id)}>
              delete
            </button>
          </li> : '')}
    </ul>
  )
};

export default Persons;