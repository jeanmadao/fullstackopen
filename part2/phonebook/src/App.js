import { useState, useEffect } from 'react'
import Input from './components/Input'
import Form from './components/Form'
import NumbersList from './components/NumbersList'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()


    const potentialPerson = persons.find(person => person.name === newName)
    if (potentialPerson === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }

    else if (window.confirm(`${potentialPerson.name} is already added to phonebook, replace the old number with a new one ?`)) {
      const updatedPerson = { ...potentialPerson, number: newNumber } 
      personService
        .update(potentialPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id=== returnedPerson.id ? returnedPerson : person))
          setSuccessMessage(
            `Updated ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.name !== newName))
          setErrorMessage(
            `${newName} was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteName = (id) => {
    return () => {
      const person = persons.find(person => person.id === id)
      if (window.confirm(`Delete ${person.name} ?`)) {
        setPersons(persons.filter(person => person.id !== id))
        personService.pop(id)
          .then(() => {
            setSuccessMessage(
              `Deleted ${person.name}`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `${person.name} was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
  }

  const handleInputChange = (setter) => (event) => setter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} notifStatus={"success"} />
      <Notification message={errorMessage} notifStatus={"error"} />
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
      <NumbersList contacts={filteredPersons} pop={deleteName} />
    </div>
  )
}

export default App
