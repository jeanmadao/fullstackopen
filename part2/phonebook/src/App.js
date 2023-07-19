import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
        <div>
          filter shown with <input 
                  value={filter}
                  onChange={handleInputChange(setFilter)}
                />
        </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleInputChange(setNewName)}
                />
        </div>
        <div>
          number: <input 
                    value={newNumber}
                    onChange={handleInputChange(setNewNumber)}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <div key={person.id}>{person.name} {person.number}</div>
      )}
      
    </div>
  )
}

export default App
