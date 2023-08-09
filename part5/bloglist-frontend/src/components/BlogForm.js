import FormInput from "./FormInput"
const BlogForm = (props) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={props.createBlog}>
        <FormInput
          desc='title:'
          type='text'
          val={props.title}
          name='Title'
          onChange={props.titleHandler}
        />
        <FormInput
          desc='author:'
          type='text'
          val={props.author}
          name='Author'
          onChange={props.authorHandler}
        />
        <FormInput
          desc='url:'
          type='text'
          val={props.url}
          name='Url'
          onChange={props.urlHandler}
        />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm
