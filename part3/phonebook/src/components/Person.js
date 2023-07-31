const Person = ( {name, number, pop} ) => {
  return (
    <div>
      {name} {number} <button onClick={pop}>delete</button>
    </div>
  )
}

export default Person
