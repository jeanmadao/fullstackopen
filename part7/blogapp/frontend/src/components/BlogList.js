import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
const BlogItem = styled.div`
  padding: 10px;
  margin: 20px 0;
  border-style: solid;
  border-width: 2px;

  &:hover {
    color: #d79921;
    background: #ebdbb2;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 5px;
`;

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <BlogItem key={blog.id}>
          <StyledLink to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </StyledLink>
        </BlogItem>
      ))}
    </div>
  );
};

export default BlogList;
