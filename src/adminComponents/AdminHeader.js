import { Grid, Link, Button, Menu, MenuItem } from "@mui/material";

import DehazeIcon from "@mui/icons-material/Dehaze";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    Cookies.set("admin", "");
    dispatch({ type: "ADMIN_LOGOUT" });
    navigate("/admin");
    handleClose();
  };

  return (
    <Grid
      container
      sx={{
        bgcolor: "#1876f2",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        height: "70px",
      }}
    >
      <Grid item xs={10}>
        <Link
          xs={10}
          sx={{
            typography: { sm: "h4", xs: "h5" },
            padding: { md: "15px" },
            margin: { md: "10px" },
          }}
          href="/admin"
          color={"white"}
          underline="none"
        >
          Snapbook Admin
        </Link>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Link href="/admin/notification">
          <NotificationsIcon sx={{ color: "white" }} />
        </Link>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <DehazeIcon sx={{ color: "white" }} />
        </Button>
      </Grid>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => logout()}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  );
}
