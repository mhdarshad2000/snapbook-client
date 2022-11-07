import { useRef, useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  List,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Axios } from "../../helpers/Axios";

const reportList = [
  "Nudity",
  "Harmful contents",
  "Violance",
  "Spam",
  "Harrasment",
  "Bullying",
];

export default function Report({ setMenuItems, postId, token }) {
  const handleClose = () => {};
  const [report, setReport] = useState(false);
  const reportRef = useRef(null);
  console.log(postId);
  const reportHandler = async (item) => {
    try {
      const { data } = await Axios.put(
        `/reportPost/${postId}`,
        {
          item,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === "ok") {
        setMenuItems(false);
        setReport(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <ul className="post_menu">
        <li className="hover1" ref={reportRef} onClick={() => setReport(true)}>
          <ReportIcon size={30} />
          Report Post
        </li>
      </ul>
      {report && (
        <Dialog open={report}>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
              Report Post
            </Typography>
            <Box
              className="small_circle"
              onClick={() => {
                setReport(false);
                setMenuItems(false);
              }}
            >
              <CloseIcon />
            </Box>
          </DialogTitle>
          <List sx={{ pt: 0, width: "20rem" }}>
            {reportList.map((item) => (
              <ListItemText
                sx={{ padding: 1, marginLeft: 2, cursor: "pointer" }}
                className="hover1"
                onClick={() => {
                  reportHandler(item);
                }}
              >
                {item}
              </ListItemText>
            ))}
          </List>
        </Dialog>
      )}
    </>
  );
}
