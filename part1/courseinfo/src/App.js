import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercices}
    </p>
  )
}

const Content = (props) => {
  const [part1, part2, part3] = props.parts

  return (
    <div>
      <Part name={part1.name} exercices={part1.exercises} />
      <Part name={part2.name} exercices={part2.exercises} />
      <Part name={part3.name} exercices={part3.exercises} />
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total exercices={part1.exercises + part2.exercises + part3.exercises} />
    </div >
  )
}

export default App;
