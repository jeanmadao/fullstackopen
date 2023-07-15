const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Content = (props) => {
  return (
    <>
      <p>
        {props.parts[0]} {props.exercices[0]}
      </p>
      <p>
        {props.parts[1]} {props.exercices[1]}
      </p>
      <p>
        {props.parts[2]} {props.exercices[2]}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercices {props.exercices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercices = [10, 7, 14]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercices={exercices} />
      <Total exercices={exercices} />
    </div>
  )
}

export default App
