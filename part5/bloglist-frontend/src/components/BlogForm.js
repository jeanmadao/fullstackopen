import { useState } from 'react'
import FormInput from './FormInput'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const inputHandler = (setter) => ({ target }) => setter(target.value)

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <FormInput
          desc='title:'
          type='text'
          val={title}
          name='Title'
          onChange={inputHandler(setTitle)}
          id='title'
        />
        <FormInput
          desc='author:'
          type='text'
          val={author}
          name='Author'
          onChange={inputHandler(setAuthor)}
          id='author'
        />
        <FormInput
          desc='url:'
          type='text'
          val={url}
          name='Url'
          onChange={inputHandler(setUrl)}
          id='url'
        />
        <button type='submit' id="create-blog-btn">create</button>
      </form>
    </>
  )
}

export default BlogForm
