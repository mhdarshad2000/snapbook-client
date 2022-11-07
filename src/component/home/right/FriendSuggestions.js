import { Alert, Avatar, Box, Button, Divider, Grid } from "@mui/material";
import "./style.scss"
import { useEffect, useState } from "react";
import { addFriend, getFriendSuggestions } from "../../../functions/user";
import {
  Boxe,
  FocusedText,
  SuggestionBox,
} from "../../../styledComponent/styled";
import { useNavigate } from "react-router-dom";

export default function FriendSuggestions({ user }) {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    friendSuggestions();
  }, []);
  const friendSuggestions = async () => {
    try {
      const friendSuggestions = await getFriendSuggestions(user);
      const suggestion = friendSuggestions.filter(
        (suggest) =>
          suggest._id !== user.id && !user.friends.includes(suggest._id)
      );
      setSuggestions(suggestion);
    } catch (error) {
      console.log(error.message);
    }
  };
  const sentRequestHandler = async (id) => {
    try {
      const sent = await addFriend(id, user.token);
      if (sent !== "ok") {
        setError(sent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box sx={{ top: "95px", position: "fixed", right: "10px" }} className="suggestion_wrap">
      <Grid container>
        <Grid item xs={2}>
          <Boxe
            br={"5px"}
            width={"360px"}
            widthS={"340px"}
            bg={"white"}
            height={"70vh"}
            minh={"fit-content"}
            border={"1px solid whitesmoke"}
            overflowY={"scroll"}
          >
            <FocusedText fs={"18px"} m={"0 0 5px"}>
              Friend Suggestions
            </FocusedText>
            <Divider />
            {error ? <Alert severity="error">{error}</Alert> : ""}

            {suggestions.length &&
              suggestions.map((suggestion, i) => (
                <SuggestionBox key={i}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >
                    <Avatar
                      sx={{
                        marginLeft: "6px",
                        width: "50px",
                        height: "50px",
                      }}
                      src={suggestion.picture}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <FocusedText>
                        {suggestion.first_name} {suggestion.last_name}
                      </FocusedText>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() =>
                            navigate(`/profile/${suggestion.username}`)
                          }
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          className="gray_btn"
                          onClick={() => sentRequestHandler(suggestion._id)}
                        >
                          Add friend
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </SuggestionBox>
              ))}
          </Boxe>
        </Grid>
      </Grid>
    </Box>
  );
}
