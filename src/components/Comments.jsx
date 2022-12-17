import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
 
`;

const Avatar = styled.img`
  height: 36px;
  width: 36px;
  object-fit: cover;
  border-radius: 50%;
`;

const Input = styled.input`
   border: none;
   border-bottom: 2px solid ${({theme}) => theme.text};
   background-color: transparent;
   padding: 5px;
   outline: none;
   width: 100%;
   color: ${({theme}) => theme.text};
`;

const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar src="https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" />
        <Input placeholder="Comments..." />
      </NewComment>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Container>
  );
};

export default Comments;
