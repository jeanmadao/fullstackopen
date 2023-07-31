import Person from './Person'

const NumbersList = ({ contacts, pop }) => {
  return (
    <div>
      {contacts.map(contact =>
        <Person 
          key={contact.id} 
          name={contact.name} 
          number={contact.number}
          pop={pop(contact.id)}
        />
      )}
    </div>
  )
}

export default NumbersList
