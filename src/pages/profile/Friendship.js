import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  addFriend,
  cancelRequests,
  deleteRequest,
  acceptRequset,
  unFriend,
} from "../../functions/user";
import useClickOutSide from "../../helpers/useClickOutSide";
import "./style.scss";
export default function Friendship({ friendshipp, profileid }) {
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);

  const [friendship, setFriendship] = useState(friendshipp);
  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);

  const menu = useRef(null);
  const respondRef = useRef(null);
  useClickOutSide(menu, () => setFriendsMenu(false));
  useClickOutSide(respondRef, () => setRespondMenu(false));

  const { user } = useSelector((state) => ({ ...state }));

  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true });
    await addFriend(profileid, user.token);
  };
  const cancelRequestHandler = async () => {
    setFriendship({ ...friendship, requestSent: false });
    await cancelRequests(profileid, user.token);
  };
  const deleteRequestHandler = async () => {
    setFriendship({ ...friendship, requestRecieved: false });
    await deleteRequest(profileid, user.token);
  };
  const acceptRequsetHandler = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      requestSent: false,
      requestRecieved: false,
    });
    await acceptRequset(profileid, user.token);
  };
  const unFriendRequsetHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
    });
    await unFriend(profileid, user.token);
  };

  return (
    <div className="friendship">
      {friendship?.friends ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
            <img src="../../../icons/friends.png" alt="" />
            <span>friends</span>
          </button>
          <button className="blue_btn">
            <img src="../../../icons/message.png" alt="" className="invert" />
            <span>Message</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={menu}>
              <div className="open_cover_menu_item">
                <img src="../../../icons/editFriends.png" alt="" />
                Edit Friend list
              </div>
              <div
                className="open_cover_menu_item"
                onClick={() => unFriendRequsetHandler()}
              >
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestRecieved &&
        !friendship?.requestSent && (
          <button className="blue_btn" onClick={() => addFriendHandler()}>
            <img src="../../../icons/addFriend.png" alt="" className="invert" />
            <span>Add Friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button
          className="blue_btn"
          onClick={() => {
            cancelRequestHandler();
          }}
        >
          <img
            src="../../../icons/cancelRequest.png"
            alt=""
            className="invert"
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestRecieved && (
          <div className="friends_menu_wrap">
            <button className="gray_btn" onClick={() => setRespondMenu(true)}>
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu" ref={respondRef}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => acceptRequsetHandler()}
                >
                  Confirm Request
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => deleteRequestHandler()}
                >
                  Delete Request
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
