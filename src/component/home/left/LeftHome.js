import LeftLinks from "./LeftLinks";
import { Link } from "react-router-dom";
import "./style.css";
import { left } from "../../../data/left";

export default function LeftHome({ user }) {
  return (
    <div className="left_home">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" />
        <span className="col_1">
          {user?.first_name} {user?.last_name}{" "}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLinks
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
          link={link.link}
        />
      ))}
    </div>
  );
}
