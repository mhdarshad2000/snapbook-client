import { Sidebar, Menu, MenuItem, ProSidebarProvider } from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import "./style.scss";
import { Link, Typography } from "@mui/material";

export default function AdminSideBar() {
  return (
    <ProSidebarProvider>
      <Sidebar backgroundColor={"#0b213e"} width={{lg:"240px",xs:"20px"}} height={"100vh"}>
        <Menu>
          <MenuItem>
            <Link
              href="/admin/home"
              className="flex_sidebar"
              underline="none"
              fontSize={"23px"}
              color="white"
            >
              <DashboardIcon />
              <Typography className="span" sx={{ display: { xs: "none", md: "block" } }}>
                Dashboard
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/admin/users"
              className="flex_sidebar"
              underline="none"
              color="white"
              fontSize={"23px"}
            >
              <PeopleAltIcon />
              <Typography className="span" sx={{ display: { xs: "none", md: "block" } }}>
                Users
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="flex_sidebar"
              href="/admin/posts"
              fontSize={"23px"}
              underline="none"
              color="white"
            >
              <PermMediaIcon />
              <Typography className="span" sx={{ display: { xs: "none", md: "block" } }}>
                Posts
              </Typography>
            </Link>
          </MenuItem>
        </Menu>
      </Sidebar>
    </ProSidebarProvider>
  );
}

// import { Grid, Link, Box } from "@mui/material";
// import React from "react";
// import DashboardIcon from "@mui/icons-material/Dashboard";

// export default function AdminSideBar() {
//   return (
//     <Grid container>
//       <Grid item>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column",
//           }}
//         >
//           <Link
//             href="/admin/home"
//             className="flex_sidebar"
//             underline="none"
//             color="white"
//           >
//             <DashboardIcon />
//             <span>Dashboard</span>
//           </Link>
//           <Link
//             href="/admin/home"
//             className="flex_sidebar"
//             underline="none"
//             color="white"
//           >
//             <DashboardIcon />
//             <span>Dashboard</span>
//           </Link>
//           <Link
//             href="/admin/home"
//             className="flex_sidebar"
//             underline="none"
//             color="white"
//           >
//             <DashboardIcon />
//             <span>Dashboard</span>
//           </Link>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// }
