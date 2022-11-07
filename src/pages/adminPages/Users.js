import ShowUsers from "../../adminComponents/ShowUsers";
import { Grid } from "@mui/material";

export default function Users() {
  return (
    <Grid container>
      <Grid item sx={12}>
        <ShowUsers />
      </Grid>
    </Grid>
  );
}
