import Blog from "./Blog"

const BlogsList = (props) => {
  return (
    <div>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={props.updateBlog}
        />
      )}
    </div>
  )

}

export default BlogsList
