import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addName = (event) => {
    event.preventDefault()

    const existence = persons.find(person => person.name === newName)
    if (existence === undefined) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
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
      {persons.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
      )}
      
    </div>
  )
}

export default App
