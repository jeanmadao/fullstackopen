import { useMutation, useQueryClient } from "react-query"
import { updateAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient()
  const notificationdispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationdispatch({ type: "DISPLAY", payload: `anecdote '${anecdote.content}' voted` })
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = ({ anecdotes }) => {
  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />)}
    </div>
  )
}

export default Anecdotes
