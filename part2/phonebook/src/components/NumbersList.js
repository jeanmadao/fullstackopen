import Person from './Person'

const NumbersList = ({ contacts }) => {
  return (
    <div>
      {contacts.map(contact =>
        <Person key={contact.id} name={contact.name} number={contact.number} />
      )}
    </div>
  )
}

export default NumbersList
