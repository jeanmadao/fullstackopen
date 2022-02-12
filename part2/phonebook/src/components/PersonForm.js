import React from 'react'

const PersonForm = ({ setNewName, setNewNumber, newName, newNumber, addPerson }) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form>
      <div>name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={addPerson}
        >
          add
        </button>
      </div>
    </form>
  )
}

export default PersonForm
