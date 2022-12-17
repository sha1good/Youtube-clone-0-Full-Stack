import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";

const Container = styled.div`
   position: sticky;
   top: 0;
   background-color: ${({theme}) => theme.bgLighter};
   height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
 `;

 //Immediately you change the position to absolute, the width of the search container will be 100%
 //To prevent that, you  have to give another width in the search container again e.g width: 40%
const Search = styled.div`
   position: absolute;  
   left: 0;
   right: 0;
   margin: auto;
   width: 40%;
   display: flex;
   align-items: center;
   justify-content: space-between;
   border: 1px solid #ccc;
   border-radius: 3px;
   padding: 5px;

`;

const Input = styled.input`
   border: none;
   background-color: transparent;
   outline: none;
`;

const Button = styled.button`
  pading: 5px 15px;
  background-color: transparent;
  color: #3ea6ff;
  border: 1px solid #3ea6ff;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search..." />
          <SearchOutlinedIcon />
        </Search>
        <Link to="signin" style={{ textDecoration : "none"}}>
        <Button>
          <AccountCircleOutlinedIcon />
          SIGN IN
        </Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
