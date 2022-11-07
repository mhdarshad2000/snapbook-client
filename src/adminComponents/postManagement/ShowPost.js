import {
  Avatar,
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Comments from "./Comments";
import { useState } from "react";

export default function ShowPost({ postDetails, setShowPost, setPostDetails }) {
  const [commentsArray, setCommentsArray] = useState(postDetails.comments);
  return (
    <Box className="blur" sx={{ overflowY: "scroll" }}>
      <Box
        sx={{
          width: "50vw",
          display: "flex",
          position: "absolute",
          left: "25vw",
          maxHeight: "100vh",
          overflowY: "scroll",
          backgroundColor: "whitesmoke",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#b2dfdb",
            width: "100%",
            height: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ fontSize: "22px", marginLeft: 5, fontWeight: 600 }}>
            Post Details
          </Box>
          <Box
            className="small_circle"
            onClick={() => {
              setShowPost(false);
              setPostDetails(null);
            }}
          >
            <CloseIcon />
          </Box>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginTop: 1,
                  marginLeft: 3,
                }}
              >
                <Avatar src={postDetails.user.picture} />
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                  {postDetails.user.first_name} {postDetails.user.last_name}
                </Typography>
              </Box>
              <Box sx={{ margin: 2, marginLeft: { lg: 10, md: 5, xs: 2 } }}>
                <Box>
                  <Typography>{postDetails.text}</Typography>
                </Box>
                {postDetails.images && (
                  <ImageList sx={{ height: 300 }} cols={2} rowHeight={120}>
                    {postDetails.images.map((img, i) => (
                      <ImageListItem key={i}>
                        <img
                          src={`${img.url}?w=164&h=164&fit=crop&auto=format`}
                        ></img>
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
                <Box sx={{ marginTop: 2 }}>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 600, marginTop: "2px" }}
                  >
                    All Comments
                  </Typography>
                  {commentsArray.length
                    ? commentsArray.map((comment, i) => (
                        <Comments
                          comment={comment}
                          postId={postDetails._id}
                          key={i}
                          setCommentsArray={setCommentsArray}
                        />
                      ))
                    : "No Comments to display"}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
