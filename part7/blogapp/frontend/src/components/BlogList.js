import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { displayNotification } from "../reducers/notificationReducer";
import { like, remove } from "../reducers/blogReducer";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  const handleLike = async (blog) => {
    dispatch(like(blog.id));
    dispatch(
      displayNotification(
        `A like for the blog '${blog.title}' by '${blog.author}'`,
      ),
    );
  };

  const handleRemove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    );
    if (ok) {
      dispatch(remove(blog.id));
      dispatch(
        displayNotification(
          `The blog' ${blog.title}' by '${blog.author} removed`,
        ),
      );
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={() => handleLike(blog)}
          canRemove={user && blog.user.username === user.username}
          remove={() => handleRemove(blog)}
        />
      ))}
    </div>
  );
};

export default BlogList;
