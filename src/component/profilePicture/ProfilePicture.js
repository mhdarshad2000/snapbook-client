import { useRef, useState } from "react";
import "./style.scss";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useClickOutSide from "../../helpers/useClickOutSide";
import { useSelector } from "react-redux";

export default function ProfilePicture({ setShow, pRef, photos }) {
  const popup = useRef(null);
  useClickOutSide(popup, () => setShow(false));
  const { user } = useSelector((state) => ({ ...state }));

  const refInput = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp"
    ) {
      setError(`${file.name} is not supported`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large, maximum 5 mb is allowed`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpg,image/jpeg,image/png,image/webp"
      />
      <div className="postBox pictureBox">
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update Profile Picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload Photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="post_error comment_error">
            <div className="post_error_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try Again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4>Choose from your profile pictures</h4>
          <div className="old_pictures">
          {photos
            .filter((img) => img.folder === `${user.username}/profile_pictures`)
            .map((photo) => (
              <img
                src={photo.secure_url}
                key={photo.public_id}
                alt=""
                style={{ width: "100px" }}
                onClick={()=>setImage(photo.secure_url)}
              />
            ))}
          </div>
        </div>
      </div>
      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setShow={setShow}
          setError={setError}
          pRef={pRef}
        />
      )}
    </div>
  );
}
