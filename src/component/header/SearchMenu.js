import { Search, Return } from "../../svg";
import { useEffect, useRef, useState } from "react";
import useClickOutSide from "../../helpers/useClickOutSide";
import {
  addToSearchHistory,
  getSearchHistory,
  searchUser,
} from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SearchMenu({ color, setShowSearchMenu }) {
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const { user } = useSelector((user) => ({ ...user }));
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutSide(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = async () => {
    const res = await getSearchHistory(user.token);
    setSearchHistory(res);
  };
  const handleSearch = async () => {
    if (searchTerm === "") {
      setResults("");
    } else {
      const res = await searchUser(searchTerm, user.token);
      setResults(res);
    }
  };
  const searchHistoryHandler = async (userId) => {
    const res = await addToSearchHistory(userId, user.token);
  };
  console.log(searchHistory);
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover_1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search..."
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleSearch}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      {results && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a>Edit</a>
        </div>
      )}
      <div className="search_history scrollbar">
        {searchHistory &&
          results == "" &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              <div className="search_user_item hover1" key={user._id}>
                <Link
                  className="flex"
                  to={`/profile/${user?.user?.username}`}
                  onClick={() => searchHistoryHandler(user?.user?._id)}
                >
                  <img src={user?.user?.picture} alt="" />
                  <span>
                    {user?.user?.first_name} {user?.user?.last_name}
                  </span>
                </Link>
                <i className="exit_icon"></i>
              </div>
            ))}
      </div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user) => (
            <div className="search_user_item hover1" key={user._id}>
              <Link
                className="flex"
                to={`/profile/${user.username}`}
                onClick={() => searchHistoryHandler(user._id)}
              >
                <img src={user.picture} alt="" />
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
