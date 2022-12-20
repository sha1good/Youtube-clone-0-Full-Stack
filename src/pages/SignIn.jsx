import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebaseHandler";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Notification from "../utils/Notification ";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 20px 50px;
  border: 1px solid ${({ theme }) => theme.textSoft};
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  padding: 10px 20px;
  width: 100%;
  border-radius: 3px;
`;
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;
const More = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 10px;
`;
const Links = styled.div`
  margin-left: 50px;
`;
const Link = styled.span`
  margin-left: 30px;
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 20px;
  width: 200px;
  white-space: nowrap;
`;

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post("/auth/signin", { username, password });
      dispatch(loginSuccess(response.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      setNotify({ isOpen: true, message: response.data });
      response.status === 200 && navigate("/signin");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error);
    }
  };

  const signinWithGoogle = async () => {
    dispatch(loginStart());
    await signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            username: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((response) => {
            dispatch(loginSuccess(response.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };
  return (
    <Container>
      <Notification notify={notify} setNotify={setNotify} />
      <Wrapper>
        <Title> Sign In</Title>
        <SubTitle>to continue to Sha1Tube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign In</Button>
        <Title>Or</Title>
        <Button onClick={signinWithGoogle}>Signin With Google</Button>
        <Title>Or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup}>Sign Up</Button>
        {error && <Error>{error.response?.data.message}</Error>}
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
