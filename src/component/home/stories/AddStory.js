import {
  Alert,
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Boxe, FocusedText } from "../../../styledComponent/styled";
import "./style.scss";
import SendIcon from "@mui/icons-material/Send";
import { uploadImages } from "../../../functions/uploadImages";
import { updateStory } from "../../../functions/user";
import { MoonLoader } from "react-spinners";
import ShowUserOptions from "./ShowUserOptions";
import { Axios } from "../../../helpers/Axios";

export default function AddStory({ user, setStory }) {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [myStories, setMyStories] = useState([]);
  const [userOptions, setUserOptions] = useState(false);
  const imgRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    stories();
  }, []);
  const stories = async () => {
    try {
      const { data } = await Axios.get("/getMyStory", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMyStories(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp"
    ) {
      setError(`${file.name} is not supported`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large, maximum 5 mb is allowed`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let blob = await fetch(image).then((b) => b.blob());
      const path = `${user.username}/story`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const storyUpdated = await updateStory(user.token, res[0].url);
      if (storyUpdated.status === "ok") {
        setLoading(false);
        setImage("");
        setStory(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error.message);
    }
  };
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Boxe
        width={"fit-content"}
        padding={"none"}
        bg={"white"}
        border={"none"}
        margin={"0px"}
        position={"relative"}
        bottom={"25px"}
        left={"90px"}
        className="white"
      >
        {error ? (
          <Alert severity="error" color="warning">
            {error}
            <Button
              sx={{ marginLeft: "15px" }}
              variant="contained"
              color="error"
              onClick={() => setError(false)}
            >
              Try Again
            </Button>
          </Alert>
        ) : (
          ""
        )}
        <List
          sx={{ backgroundColor: "white", borderRadius: "5px" }}
          ref={listRef}
        >
          <ListItemButton onClick={() => setUserOptions(true)}>
            view Story
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => imgRef.current.click()}>
            Post Images
          </ListItemButton>
        </List>
        <input
          type="file"
          ref={imgRef}
          hidden
          onChange={handleImage}
          accept="image/jpg,image/jpeg,image/png,image/webp"
        />
      </Boxe>
      {image ? (
        <Box className="blur">
          <Box
            className="box_header"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <FocusedText>Update story</FocusedText>
            <Box className="small_circle" onClick={() => setStory(false)}>
              <i className="exit_icon"></i>
            </Box>
          </Box>
          <Box className="update_wrap_story">
            <img className="preview" src={image} alt="" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              marginX: "35px",
              marginTop: "15px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              disabled={loading}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
              onClick={() => handleSubmit()}
            >
              {loading ? <MoonLoader size={15} color="white" /> : <SendIcon />}
            </Button>
          </Box>
        </Box>
      ) : (
        ""
      )}
      {userOptions && myStories.length > 0 && (
        <ShowUserOptions
          user={user}
          setUserOptions={setUserOptions}
          myStories={myStories}
          setStory={setStory}
        />
      )}
    </Box>
  );
}
