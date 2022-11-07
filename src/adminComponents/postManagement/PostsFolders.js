import { Avatar, Box, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AllUsers } from "../../functions/admin";
import FolderIcon from "@mui/icons-material/Folder";

export default function PostsFolders() {
  const { admin } = useSelector((state) => ({ ...state }));
  const [folder, setFolders] = useState();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await AllUsers(admin);
    setFolders(data);
  };

  return (
    <Grid container sx={{ maxHeight: "87vh", overflowX: "scroll" }}>
      {folder &&
        folder.map((f) => (
          <Grid item xs={6} md={4} lg={3}>
            <Link
              underline="none"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
              href={`/admin/posts/${f._id}`}
            >
              <FolderIcon
                sx={{ fontSize: { xs: 120, md: 200 }, color: "#616161" }}
              />
              <Typography sx={{ color: "#616161", marginTop: -3 }}>
                {f.first_name} {f.last_name}
              </Typography>
            </Link>
          </Grid>
        ))}
    </Grid>
  );
}
