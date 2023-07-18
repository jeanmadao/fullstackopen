import { useState } from 'react'

const Button = ({handler, text}) => <button onClick={handler}>{text}</button>

const Votes = ({vote}) => <div>has {vote} votes</div>

const Anecdote = ({anecdote, vote}) => (
  <div>
    <div>{anecdote}</div>
    <Votes vote={vote} />
  </div>
)

const Title = ({title}) => <h1>{title}</h1>

const DailyAnecdote = ({anecdote, vote, voteHandler, randomHandler}) => (
    <div>
      <Title title="Anecdote of the day" />
      <Anecdote anecdote={anecdote} vote={vote} />
      <Button handler={voteHandler} text={"vote"} />
      <Button handler={randomHandler} text={"next anecdote"} />
    </div>
)

const findMaxIndex = (array) => {
  let max = 0
  let maxIndex = 0
  for (let i=0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
      maxIndex = i
    }
  }
  return maxIndex
}

const PopularAnecdote = ({anecdote, vote}) => (
    <div>
      <Title title="Anecdote with most votes" />
      <Anecdote anecdote={anecdote} vote={vote} />
    </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const popularAnecdote = findMaxIndex(votes)
  const randomSelected = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const voteAnecdote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <DailyAnecdote anecdote={anecdotes[selected]} vote={votes[selected]} voteHandler={voteAnecdote} randomHandler={randomSelected} />
      <PopularAnecdote anecdote={anecdotes[popularAnecdote]} vote={votes[popularAnecdote]} />
    </div>
  )
}

export default App
