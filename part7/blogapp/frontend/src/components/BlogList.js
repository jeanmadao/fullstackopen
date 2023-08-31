import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
  };
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={style}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
