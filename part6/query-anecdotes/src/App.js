import { useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'

const App = () => {

  const { isLoading, isError, data } = useQuery('anecdotes', getAnecdotes, { retry: 1 })


  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <Anecdotes anecdotes={data} />

    </div>
  )
}

export default App
