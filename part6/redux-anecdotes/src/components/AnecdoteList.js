import { useDispatch, useSelector } from 'react-redux'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            dispatch({ type: 'anecdotes/vote', payload: anecdote.id })
          }
        />
      )}
    </>
  )
}

export default AnecdoteList
