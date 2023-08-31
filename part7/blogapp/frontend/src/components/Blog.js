import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { like, remove, comment } from "../reducers/blogReducer";
import { displayNotification } from "../reducers/notificationReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login);
  const match = useMatch("/blogs/:id");
  const blogs = useSelector((state) => state.blogs);
  const { clear: clearCommentField, ...commentField } = useField(
    "text",
    "comment",
  );
  const blog = blogs.find((blog) => blog.id === match.params.id);

  if (!blog) {
    return null;
  }

  const handleLike = async () => {
    dispatch(like(blog.id));
    dispatch(
      displayNotification(
        `A like for the blog '${blog.title}' by '${blog.author}'`,
      ),
    );
  };

  const handleRemove = async () => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    );
    if (ok) {
      dispatch(remove(blog));
      dispatch(
        displayNotification(
          `The blog' ${blog.title}' by '${blog.author} removed`,
        ),
      );
      navigate("/");
    }
  };

  const handleComment = async () => {
    dispatch(comment({ body: commentField.value, blogId: blog.id }));
    clearCommentField();
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.username}</div>
      {user.username === blog.user.username && (
        <button onClick={handleRemove}>remove</button>
      )}
      <h3>comments</h3>
      <input {...commentField} />
      <button onClick={handleComment}>add comment</button>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
