import "./style.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequset,
  cancelRequests,
  deleteRequest,
} from "../../functions/user";

export default function Card({ userr, type, getData, setRefreshFriends }) {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  const cancelRequestHandler = async (id) => {
    const res = await cancelRequests(id, user.token);
    if (res === "ok") {
      getData();
      setRefreshFriends((prev) => !prev);
    }
  };
  const confirmRequest = async (id) => {
    const res = await acceptRequset(id, user.token);
    if (res === "ok") {
      getData();
      setRefreshFriends((prev) => !prev);
    }
  };
  const deleteRequestHandler = async (id) => {
    const res = await deleteRequest(id, user.token);
    if (res === "ok") {
      getData();
      setRefreshFriends((prev) => !prev);
    }
  };
  console.log(userr?.friends?.includes(user.id));
  return (
    <div className="req_card">
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      <div className="req_name">
        {userr.first_name} {userr.last_name}
        {type === "sentRequest" ? (
          <button
            className="blue_btn"
            onClick={() => cancelRequestHandler(userr._id)}
          >
            Cancel Requests
          </button>
        ) : type === "request" ? (
          <div className="btn_line">
            <button
              className="blue_btn"
              onClick={() => confirmRequest(userr._id)}
            >
              Confirm
            </button>
            <button
              className="gray_btn"
              onClick={() => deleteRequestHandler(userr._id)}
            >
              Delete
            </button>
          </div>
        ) : type === "friends" ? (
          <Link to={`/profile/${userr.username}`}>
            <button className="blue_btn">View Profile</button>
          </Link>
        ) : (
          type === "suggestions" &&
          (userr.friends.includes(user.id) ? (
            <Link to={`/profile/${userr.username}`}>
              <button className="blue_btn">View Profile</button>
            </Link>
          ) : userr.requests.includes(user.id) ? (
            <>
              <button
                className="blue_btn"
                onClick={() => cancelRequestHandler(userr._id)}
              >
                Cancel requests
              </button>
            </>
          ) : (
            <Link to={`/profile/${userr.username}`}>
              <button className="blue_btn">View Profile</button>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
