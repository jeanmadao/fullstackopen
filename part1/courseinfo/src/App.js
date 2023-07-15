const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) => {
  return (
      <p>
        {props.part} {props.exercices}
      </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} exercices={props.exercices[0]} />
      <Part part={props.parts[1]} exercices={props.exercices[1]} />
      <Part part={props.parts[2]} exercices={props.exercices[2]} />
    </div>
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
