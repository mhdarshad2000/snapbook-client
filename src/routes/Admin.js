import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/adminPages/AdminLogin";
import AdminHome from "../pages/adminPages/AdminHome";
import AdminLoggedInRouter from "../protectedRouters/AdminLoggedInRouter";
import AdminNotLoggedInRouter from "../protectedRouters/AdminNotLoggedInRouter";
import Users from "../pages/adminPages/Users";
import Posts from "../pages/adminPages/Posts";
import AdminSideBar from "../adminComponents/AdminSideBar";
import { Box } from "@mui/material";
import AdminHeader from "../adminComponents/AdminHeader";
import Notification from "../pages/adminPages/Notification";
import { useEffect } from "react";

export default function AdminRouter() {
  useEffect(() => {
    getReports();
  });
  const getReports = () => {};
  return (
    <Box sx={{ display: "flex" }}>
      <AdminSideBar />
      <Box sx={{ width: "100%" }}>
        <AdminHeader />
        <Routes>
          <Route element={<AdminNotLoggedInRouter />}>
            <Route path="/" element={<AdminLogin />} />
          </Route>
          <Route element={<AdminLoggedInRouter />}>
            <Route path="/home" element={<AdminHome />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts type="grid" />} />
            <Route path="/posts/:userId" element={<Posts type="single" />} />
            <Route path="/notification" element={<Notification />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
}
