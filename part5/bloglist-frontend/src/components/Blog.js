import { useState } from "react"

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {`${blog.title} ${blog.author} `}
      <button onClick={toggleShow}>{show ? "hide" : "view"}</button>
      {show &&
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button>like</button></div>
          <div>{blog.user.name}</div>
        </div>
      }
    </div>
  )
}

export default Blog
