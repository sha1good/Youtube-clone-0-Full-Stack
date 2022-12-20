import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;
const Img = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  object-fit: cover;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => (props.type === "sm" ? "" : "16px")};
  gap: 12px;
  flex: 1;
`;

const ChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Error = styled.span`
  color: red;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 100vh;
  right: 0;
  left: 0;
  margin: auto;
`;

const Card = ({ type, video }) => {
  //Channel here is the same as the user
  const [channels, setChannels] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get(`/users/find/${video.userId}`);
        setChannels(response.data);
      } catch (error) {
        setError(error);
      }
    };
    getVideos();
  }, [video]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Img type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImg
            type={type}
            src={
              channels.img
                ? channels.img
                : "https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            }
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channels.username}</ChannelName>
            <Info>
              {video.views} views . {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
        {error && <Error>Unable to fetch video data!</Error>}
      </Container>
    </Link>
  );
};

export default Card;
