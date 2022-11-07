import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';

export default function NotLoggedInRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Navigate to="/" /> : <Outlet />
}
