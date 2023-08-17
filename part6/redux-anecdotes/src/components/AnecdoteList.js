import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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
          handleClick={() => {
            dispatch(vote(anecdote.id))
            dispatch({
              type: 'notification/setNotification',
              payload: `you voted '${anecdote.content}'`
            })
            setTimeout(() =>
              dispatch({ type: 'notification/resetNotification' }), 5000)
          }}
        />
      )}
    </>
  )
}

export default AnecdoteList
