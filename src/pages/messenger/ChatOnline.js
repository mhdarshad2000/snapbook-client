import { useEffect, useState } from "react";
import { Axios } from "../../helpers/Axios";

export default function ChatOnline({ onlineUsers, user, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  useEffect(() => {
    getFriends();
  }, [user]);
  const getFriends = async () => {
    const res = await Axios.get("/getFriends", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setFriends(res.data.friends);
  };
  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [onlineUsers, friends]);

  const handleClick = async (userId) => {
    try {
      const res = await Axios.get(`/findConversation/${userId._id}`,{
        headers:{Authorization:`Bearer ${user.token}`}
      });
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="chat_online">
      {onlineFriends &&
        onlineFriends.map((user) => (
          <div className="chat_online_friend" onClick={() => handleClick(user)}>
            <div className="chat_onlineImg_container">
              <img src={user.picture} alt="" />
              <div className="chat_online_badge"></div>
            </div>
            <div className="chat_online_name">
              {user.first_name} {user.last_name}
            </div>
          </div>
        ))}
    </div>
  );
}
