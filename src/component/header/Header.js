import { Link } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import SearchMenu from "./SearchMenu";
import { Search, HomeActive, Friends, Home } from "../../svg";
import { useSelector, useDispatch } from "react-redux";
import { FaFacebookMessenger } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FocusedText } from "../../styledComponent/styled";

export default function Header({ getAllPosts, page }) {
  const color = "#65676b";
  const { user } = useSelector((state) => ({ ...state }));
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [profileView, setProfileView] = useState(false);
  const [hideDock, setHideDock] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandle = async () => {
    Cookies.set("user", "");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <header>
      <div className="header_left">
        <Link to="/">
          <div className="header_logo">Snapbook</div>
        </Link>
        {showSearchMenu ? (
          ""
        ) : (
          <>
            <div
              className="search search_1"
              onClick={() => setShowSearchMenu(true)}
            >
              <Search color={color} />
              <input
                type="text"
                placeholder="Search.."
                className="hide_input"
              />
            </div>
            <div className="small_circle search_bg">
              <div
                className="search_small"
                onClick={() => setShowSearchMenu(true)}
              >
                <Search color={color} />
              </div>
            </div>
          </>
        )}
      </div>

      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
          onClick={() => getAllPosts()}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          <Friends color={color} page={page} />
        </Link>
        <Link
          to="/messenger"
          className={`middle_icon ${
            page === "messenger" ? "active" : "hover1"
          }`}
        >
          <div className="messenger">
            <FaFacebookMessenger color={color} />
          </div>
        </Link>
      </div>
      {profileView ? (
        <div className="profile_view">
          <Link to={`/profile/${user.username}`}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <Avatar src={user.picture} />
              <FocusedText>
                {user.first_name} {user.last_name}
              </FocusedText>
            </Box>
          </Link>
          <Button
            sx={{ marginTop: "8px", marginLeft: "8px" }}
            variant="contained"
            color="error"
            onClick={() => logoutHandle()}
          >
            Logout
          </Button>
        </div>
      ) : (
        ""
      )}
      <div className="header_right">
        <div
          className="right_menu"
          onClick={() => setHideDock((prev) => !prev)}
        >
          <MenuIcon />
        </div>
        <div
          className="profile_view_img"
          onClick={() => setProfileView((prev) => !prev)}
        >
          <img src={user.picture} alt="" />
        </div>
      </div>
      {hideDock ? (
        <div className="dock">
          <Link
            to="/"
            className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
            onClick={() => getAllPosts()}
          >
            {page === "home" ? <HomeActive /> : <Home color={color} />} Home
          </Link>
          <Link
            to="/friends"
            className={`middle_icon ${
              page === "friends" ? "active" : "hover1"
            }`}
          >
            <Friends color={color} page={page} /> Friends
          </Link>
          <Link
            to="/messenger"
            className={`middle_icon ${
              page === "messenger" ? "active" : "hover1"
            }`}
          >
            <div className="messenger">
              <FaFacebookMessenger color={color} />
            </div>
            Messenger
          </Link>
          <Button
            variant="contained"
            color="error"
            onClick={() => logoutHandle()}
          >
            Logout
          </Button>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
