import styled from "styled-components";
import { Link } from "react-router-dom";

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
  margin-top: ${(props) => props.type === "sm" ? "" : "16px"};
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

const Card = ({ type }) => {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Img
          type={type}
          src="https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
        <Details type={type}>
          <ChannelImg
            type={type}
            src="https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          />
          <Texts>
            <Title>Sha1 Video Test</Title>
            <ChannelName>Sha1 Dev</ChannelName>
            <Info>6600 views . 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
