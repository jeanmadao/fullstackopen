import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { create } from "../reducers/blogReducer";
import { displayNotification } from "../reducers/notificationReducer";

const NewBlogForm = () => {
  const dispatch = useDispatch();
  const title = useField("text", "title");
  const author = useField("text", "author");
  const url = useField("text", "url");

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      create({ title: title.value, author: author.value, url: url.value }),
    );
    dispatch(
      displayNotification(
        `A new blog '${title.value}' by '${author.value}' added`,
      ),
    );
  };

  return (
    <div>
      <h4>Create a new blog</h4>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
