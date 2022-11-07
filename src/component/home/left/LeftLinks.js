import React from "react";
import { Link } from "react-router-dom";

export default function LeftLinks({ img, text, notification, link }) {
  return (
    <div className="left_link">
      <Link to={link}>
        <div className="col">
          <img src={`../../../left/${img}.png`} alt="" />
          <div className="col_1">{text}</div>
        </div>
      </Link>
    </div>
  );
}
