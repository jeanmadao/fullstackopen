import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { logout } from "../reducers/loginReducer";

const Header = styled.header`
  position: sticky;
  top: 0;
  background: #d79921;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  font-weight: 600;
`;

const Nav = styled.nav``;

const UL = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 5px;

  &:hover {
    color: #d79921;
    background: #ebdbb2;
  }
`;

const Logo = styled.div`
  font-size: 40px;
  justify-content: flex-start;
`;

const Login = styled.div`
  justify-content: flex-end;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  return (
    <Header>
      <HeaderContainer>
        <Logo>Blogs</Logo>
        <Nav>
          <UL>
            <li>
              <StyledLink to={"/"}>blogs</StyledLink>
            </li>
            <li>
              <StyledLink to={"/users"}>users</StyledLink>
            </li>
          </UL>
        </Nav>
      </HeaderContainer>
      <HeaderContainer>
        <span>{user.username} logged in</span>
        <StyledLink as="button" onClick={() => dispatch(logout())}>
          logout
        </StyledLink>
      </HeaderContainer>
    </Header>
  );
};

export default Menu;
