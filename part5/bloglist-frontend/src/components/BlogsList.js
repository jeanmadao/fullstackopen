import Blog from "./Blog"

const BlogsList = (props) => {
  return (
    <div>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={props.updateBlog}
          removeBlog={props.removeBlog}
          user={props.user}
        />
      )}
    </div>
  )

}

export default BlogsList
