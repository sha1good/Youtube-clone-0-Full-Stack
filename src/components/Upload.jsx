import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebaseHandler";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  background-color: transparent;
  padding: 10px;
`;
const Desc = styled.textarea`
  border: 2px solid ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  background-color: transparent;
  padding: 10px;
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

const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [imgPercentage, setImgPercentage] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const handleChange = (event) => {
    setInputs((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPercentage(progress)
          : setVideoPercentage(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (event) => {
    event.preventDefault();
    const response = await axios.post("/videos", { ...inputs, tags });
    setOpen(false);
    response.status === 200 && navigate(`/video/${response.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload the video</Title>
        <Label>Upload Video:</Label>
        {videoPercentage > 0 ? (
          "Uploading:" + videoPercentage + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(event) => setVideo(event.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate tags with commas"
          onChange={handleTags}
        />
        <Desc
          placeholder="Description"
          rows={8}
          name="desc"
          onChange={handleChange}
        />
        <Label>Upload Image: </Label>
        {imgPercentage > 0 ? (
          "Uploading:" + imgPercentage + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(event) => setImg(event.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
