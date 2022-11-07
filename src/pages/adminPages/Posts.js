import PostsFolders from "../../adminComponents/postManagement/PostsFolders";
import { Grid } from "@mui/material";
import ListFolders from "../../adminComponents/postManagement/ListPosts";

export default function Posts({ type }) {
  return (
    <Grid container>
      <Grid item sx={12}>
        {type === "grid" ? <PostsFolders /> : <ListFolders />}
      </Grid>
    </Grid>
  );
}
