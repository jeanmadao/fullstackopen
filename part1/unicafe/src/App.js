import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Title = ({title}) => <h1>{title}</h1>

const Feedback = ({goodHandler, neutralHandler, badHandler}) => {
  return (
    <div>
      <Title title="give feedback" />
      <Button handleClick={goodHandler} text="good"/>
      <Button handleClick={neutralHandler} text="neutral"/>
      <Button handleClick={badHandler} text="bad"/>
    </div>
  )
}

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all > 0) {
    const average = (good - bad) / all
    const positive = good * 100 / all
    return (
      <div>
        <Title title="statistics" />
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive + " %"} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <Title title="statistics" />
        <div>No feedback given</div>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementState = (setter, value) => () => setter(value + 1)
  
  return (
    <div>
      <Feedback goodHandler={incrementState(setGood, good)}
                neutralHandler={incrementState(setNeutral, neutral)} 
                badHandler={incrementState(setBad, bad)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
