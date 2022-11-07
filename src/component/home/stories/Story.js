import { Avatar, Grid, Box } from "@mui/material";
import { FocusedText, StoryRound } from "../../../styledComponent/styled";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import AddStory from "./AddStory";
import { useSelector } from "react-redux";
import { Axios } from "../../../helpers/Axios";
import ShowStory from "./ShowStory";

export default function Story() {
  const { user } = useSelector((state) => ({ ...state }));
  const [story, setStory] = useState(false);
  const [stories, setStories] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [singleStory, setSingleStory] = useState([]);
  useEffect(() => {
    getStories();
  }, []);
  const getStories = async () => {
    try {
      const { data } = await Axios.get("/getStories", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setStories(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box>
            {/*  */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box><Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box><Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box><Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box><Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box><Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box><Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box><Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box><Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box><Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StoryRound>
                <Avatar
                  src={user.picture}
                  sx={{
                    width: "103px",
                    height: "103px",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    setStory(true);
                  }}
                />
              </StoryRound>
              <FocusedText m={"-10px 0 5px 0"}>My Stories</FocusedText>
            </Box>

            {/*  */}
            {stories.length
              ? stories.map((story, i) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <StoryRound border={"3px solid #16a112"} key={i}>
                      <Avatar
                        src={story[0]?.user?.picture}
                        sx={{
                          width: "103px",
                          height: "103px",
                          objectFit: "cover",
                        }}
                        onClick={() => {
                          setShowStory(true);
                          setSingleStory(story);
                        }}
                      />
                    </StoryRound>
                    <FocusedText m={"-10px 0 5px 0"}>
                      {story[0]?.user?.first_name} {story[0]?.user?.last_name}
                    </FocusedText>
                  </Box>
                ))
              : ""}
          </Box>
          {story && <AddStory user={user} setStory={setStory} />}
          {showStory ? (
            <ShowStory
              story={singleStory}
              setShowStory={setShowStory}
              stories={stories}
              setStories={setStories}
            />
          ) : (
            ""
          )}
          {showStory ? (
            <ShowStory
              story={singleStory}
              setShowStory={setShowStory}
              stories={stories}
              setStories={setStories}
            />
          ) : (
            ""
          )}
          {showStory ? (
            <ShowStory
              story={singleStory}
              setShowStory={setShowStory}
              stories={stories}
              setStories={setStories}
            />
          ) : (
            ""
          )}
          {showStory ? (
            <ShowStory
              story={singleStory}
              setShowStory={setShowStory}
              stories={stories}
              setStories={setStories}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </>
  );
}
