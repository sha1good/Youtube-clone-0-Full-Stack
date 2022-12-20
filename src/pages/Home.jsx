import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
  width: 100vw;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get(`/videos/${type}`);
        setVideos(response.data);
      } catch (error) {
        setError(error);
      }
    };
   type && getVideos();
  }, [type]);
  return (
    <>
      {!error  ? (
        <Container>
          {videos.map((video) => (
            <Card key={video._id} video={video} />
          ))}
        </Container>
      ) : (
        <Error>Unable to fetch video data!</Error>
      )}
    </>
  );
};

export default Home;
