import {
  Avatar,
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import React, { useEffect } from "react";
import { Boxe, FocusedText, RowFlexBox } from "../styledComponent/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import { Axios } from "../helpers/Axios";

export default function Report({ report, reports, setReports, token }) {
  const deleteHandler = async (id, postId) => {
    try {
      const { data } = await Axios.post(
        `/admin/report/${id}`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReports(reports.filter((rep) => rep.post._id !== postId));
      console.log("deleted");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(reports);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "80vh",
      }}
    >
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Boxe>
          <RowFlexBox fd={"row"} jc={"space-between"}>
            <RowFlexBox>
              <FocusedText>
                {report.reportedBy.first_name} {report.reportedBy.last_name}
              </FocusedText>
              <Typography> has reported a Post</Typography>
            </RowFlexBox>
            <RowFlexBox>
              <Box
                className="small_circle"
                onClick={() => deleteHandler(report._id, report.post._id)}
              >
                <DeleteIcon />
              </Box>
            </RowFlexBox>
          </RowFlexBox>
          <RowFlexBox fd={"row"}>
            <Avatar src={report.post?.user.picture} />
            <FocusedText>
              {report.post?.user.first_name} {report.post?.user.last_name}
            </FocusedText>
          </RowFlexBox>
          <RowFlexBox m={"12px 0px 12px"}>{report.post?.text}</RowFlexBox>
          <RowFlexBox>
            {report.post?.images?.length ? (
              <ImageList cols={3} rowHeight={164}>
                {report.post.images.map((image, i) => (
                  <ImageListItem key={i}>
                    <img src={image.url} />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              ""
            )}
          </RowFlexBox>
        </Boxe>
      </Grid>
    </Grid>
  );
}
