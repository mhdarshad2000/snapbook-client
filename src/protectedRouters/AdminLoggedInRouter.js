import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminLoggedInRouter() {
  const { admin } = useSelector((state) => ({ ...state }));
  console.log(admin)
  return admin ? <Outlet /> : <Navigate to="/admin" />;
}
