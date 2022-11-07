import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AdminHeader from "../../adminComponents/AdminHeader";
import AdminSideBar from "../../adminComponents/AdminSideBar";
import Dashboard from "./Dashboard";

export default function AdminHome() {
  return (
    <Grid container>
        <Grid item>
          <Dashboard />
        </Grid>
    </Grid>
  );
}
