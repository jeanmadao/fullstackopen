import Blog from "./Blog"

const BlogsList = (props) => {
  return (
    <div>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )

}

export default BlogsList
