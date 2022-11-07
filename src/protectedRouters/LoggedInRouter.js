import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LoggedInRouter() {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Outlet /> : <Navigate to="/login" />;
}
