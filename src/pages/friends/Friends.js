import "./style.scss";
import Header from "../../component/header/Header";
import { FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import {
  getFriendsPageInfos,
  getFriendSuggestions,
} from "../../functions/user";
import { friendsReducer } from "../../functions/Reducers";
import Card from "./Card";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../../helpers/Axios";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

export default function Friends() {
  const { type } = useParams();
  const { user } = useSelector((user) => ({ ...user }));
  const [suggestions, setSuggestions] = useState([]);
  const [refreshFriends, setRefreshFriends] = useState(false);
  const [{ loading, error, friends }, dispatch] = useReducer(friendsReducer, {
    loading: false,
    friends: {},
    error: "",
  });

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    friendSuggestions();
  }, [refreshFriends]);
  const getData = async () => {
    dispatch({ type: "FRIENDS_REQUEST" });
    const data = await getFriendsPageInfos(user.token);
    if (data.status === "ok") {
      dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
    } else {
      dispatch({ type: "FRIENDS_ERROR", payload: data.data });
    }
  };

  const friendSuggestions = async () => {
    try {
      const data = await getFriendSuggestions(user);
      setSuggestions(data.filter((data) => data._id !== user.id));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Header page="friends" />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h2>Friends</h2>
          </div>
          <div className="friends_left_wrap">
            <Link
              to="/friends"
              className={`menu_item ${type === undefined && "active_friends"}`}
            >
              <div className="small_circle">
                <FaUserFriends
                  size={24}
                  className={type === undefined && "invert"}
                />
              </div>
              <span>Home</span>
            </Link>
            <Link
              to="/friends/request"
              className={`menu_item ${type === "request" && "active_friends"}`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friend Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/sentRequests"
              className={`menu_item ${
                type === "sentRequests" && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Sent Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/all"
              className={`menu_item ${type === "all" && "active_friends"}`}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All Friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/suggestions"
              className={`menu_item ${
                type === "suggestions" && "active_friends"
              }`}
            >
              <div className="small_circle">
                <GroupAddIcon />
              </div>
              <span>Friend suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
          </div>
        </div>
        <div className="friends_right">
          {(type === undefined || type === "request") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friend Requests</h3>
                {/* <a className="see_link hover3">See all</a> */}
              </div>
              <div className="flex_wrap">
                {friends.request &&
                  friends.request.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type="request"
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
          {(type === undefined || type === "sentRequests") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Sent Requests</h3>
                {/* <a className="see_link hover3">See all</a> */}
              </div>
              <div className="flex_wrap">
                {friends.sentRequests &&
                  friends.sentRequests.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type="sentRequest"
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
          {(type === undefined || type === "all") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friends</h3>
                {/* <a className="see_link hover3">See all</a> */}
                {/* If needed this can be applied by using Link tag and the map for displaying friends
                 can be controlled by using slice method */}
              </div>
              <div className="flex_wrap">
                {friends.friends &&
                  friends.friends.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type="friends"
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
          {(type === undefined || type === "suggestions") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friend suggestions</h3>
                {/* <a className="see_link hover3">See all</a> */}
              </div>
              <div className="flex_wrap">
                {suggestions &&
                  suggestions.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type="suggestions"
                      getData={getData}
                      setRefreshFriends={setRefreshFriends}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
