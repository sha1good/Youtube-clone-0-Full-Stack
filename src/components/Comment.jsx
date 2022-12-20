import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;
`;

const Avatar = styled.img`
  height: 36px;
  width: 36px;
  object-fit: cover;
  border-radius: 50%;
`;

const CommentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Date = styled.span`
  padding-left: 30px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
`;

const Text = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const response = await axios.get(`/users/find/${comment.userId}`);
      setChannel(response.data);
    };
    fetchComment();
  }, [comment.userId]);
  return (
    <Container>
      <Avatar
        src={
          channel?.img
            ? channel.img
            : "https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        }
      />
      <CommentDetails>
        <Name>
          {channel.username} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
          {comment?.desc
            ? comment.desc
            : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribusdolores ipsam ut."}
        </Text>
      </CommentDetails>
    </Container>
  );
};

export default Comment;
