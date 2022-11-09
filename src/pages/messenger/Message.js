import { format } from "timeago.js";
export default function Message({ message, own, user }) {
  return (
    <div className={own ? " message own" : "message"}>
      <div className="message_top">
        {/* <Avatar src={`own?${user.img}:""`} /> */}
        {/* <img src="../../../images/arshad.jpg" alt="" /> */}
        <p className="message_text">{message.text} </p>
      </div>
      <div className="message_bottom">{format(message.createdAt)}</div>
    </div>
  );
}
