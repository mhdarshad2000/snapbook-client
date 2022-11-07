import { useEffect, useState } from "react";
import { Axios } from "../../helpers/Axios";
import "./style.scss";

export default function Conversation({ conversation, user }) {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== user.id);

    const getUser = async () => {
      try {
        const res = await Axios.get(`/getUser/${friendId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [user, conversation]);
  return (
    <div className="conversation hover1">
      <img className="conversation_img" src={users?.picture} alt="" />
      <span className="conversation_name">{users?.username}</span>
    </div>
  );
}
