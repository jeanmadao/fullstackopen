import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  const increaseLikes = () => {
    updateBlog(blog.id, {
      url: blog.url,
      title: blog.title,
      author: blog.author,
      user: blog.user.id,
      likes: blog.likes + 1
    })
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
          <div>
            likes {blog.likes}
            <button onClick={increaseLikes}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      }
    </div>
  )
}

export default Blog
