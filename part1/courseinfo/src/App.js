import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
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
  const [part1, part2, part3] = props.parts
  const [exercices1, exercises2, exercices3] = props.exercises

  return (
    <div>
      <Part part={part1} exercices={exercices1} />
      <Part part={part2} exercices={exercises2} />
      <Part part={part3} exercices={exercices3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercices {props.exercices}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total exercices={exercises1 + exercises2 + exercises3} />
    </div >
  )
}

export default App;
