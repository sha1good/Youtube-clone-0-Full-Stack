import styled from "styled-components";

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

const SignIn = () => {
  return (
    <Container>
      <Wrapper>
        <Title> Sign In</Title>
        <SubTitle>to continue to Sha1Tube</SubTitle>
        <Input placeholder="username" />
        <Input placeholder="password" type="password" />
        <Button>Sign In</Button>
        <Title>Or</Title>
        <Input placeholder="username" />
        <Input placeholder="email" />
        <Input placeholder="password" type="password" />
        <Button>Sign Up</Button>
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
