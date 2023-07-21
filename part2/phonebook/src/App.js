import { useState, useEffect } from 'react'
import Input from './components/Input'
import Form from './components/Form'
import NumbersList from './components/NumbersList'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
}, [])

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()

    const existence = persons.find(person => person.name === newName)
    if (existence === undefined) {
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
  }

  const handleInputChange = (setter) => (event) => setter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Input
        description="filter shown with"
        value={filter}
        onChange={handleInputChange(setFilter)}
      />
      <h2>add a new</h2>
      <Form
        onSubmit={addName}
        buttonText="add"
        inputs={[
          { id: 0, description: "name:", value: newName, onChange: handleInputChange(setNewName) },
          { id: 1, description: "number:", value: newNumber, onChange: handleInputChange(setNewNumber) }
        ]}
      />
      <h2>Numbers</h2>
      <NumbersList contacts={filteredPersons} />
    </div>
  )
}

export default App
