import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter }) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <ul>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} />
      )}
    </ul>
  )
}

export default Persons
