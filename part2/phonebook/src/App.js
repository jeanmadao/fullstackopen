import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length,
    }
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

      <h3>add a new</h3>
      <PersonForm
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
