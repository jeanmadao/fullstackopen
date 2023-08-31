import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { create } from "../reducers/blogReducer";
import { displayNotification } from "../reducers/notificationReducer";

const NewBlogForm = () => {
  const dispatch = useDispatch();
  const { clear: clearTitleField, ...titleField } = useField("text", "title");
  const { clear: clearAuthorField, ...authorField } = useField(
    "text",
    "author",
  );
  const { clear: clearUrlField, ...urlField } = useField("text", "url");

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      create({
        title: titleField.value,
        author: authorField.value,
        url: urlField.value,
      }),
    );
    dispatch(
      displayNotification(
        `A new blog '${titleField.value}' by '${authorField.value}' added`,
      ),
    );
    clearTitleField();
    clearAuthorField();
    clearUrlField();
  };

  return (
    <div>
      <h4>Create a new blog</h4>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input {...titleField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url
          <input {...urlField} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
