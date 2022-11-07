import { useState } from "react";
import Bio from "./Bio";

export default function Detail({
  img,
  value,
  placeholder,
  name,
  handleChange,
  infos,
  updateDetails,
  text,
  rel
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="add_details_flex" onClick={() => setShow(true)}>
        {value ? (
          <div className="info_profile no_underline">
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            Add {text}
          </>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          infos={infos}
          updateDetails={updateDetails}
          detail
          setShow={setShow}
          rel={rel}
        />
      )}
    </div>
  );
}
