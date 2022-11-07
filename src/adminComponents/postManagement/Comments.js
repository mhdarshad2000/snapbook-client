import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Moment from "react-moment";
import "./style.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { Axios } from "../../helpers/Axios";
import { useSelector } from "react-redux";

export default function Comments({ comment, postId, setCommentsArray }) {
  const { admin } = useSelector((state) => ({ ...state }));
  const deleteHandler = async (commentId) => {
    try {
      const { data } = await Axios.put(
        `/admin/deleteComment/${postId}`,
        { commentId },
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      setCommentsArray((prev) => prev.filter((item) => item._id !== commentId));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Grid container>
      <Grid item sx={{ marginTop: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginY: 1 }}>
          <Avatar src={comment.commentBy.picture} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "11vw",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                {comment.commentBy.first_name} {comment.commentBy.last_name}
              </Typography>
              <Typography sx={{ color: "#757575", fontSize: "12px" }}>
                <Moment fromNow interval={30}>
                  {comment.commentAt}
                </Moment>
              </Typography>
            </Box>
            <Box
              className="small_circle"
              onClick={() => {
                deleteHandler(comment._id);
              }}
            >
              <DeleteIcon />
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginLeft: 2 }}>
          <Typography>{comment.comment}</Typography>
          {comment.image && (
            <img className="comment_image" src={comment.image} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
