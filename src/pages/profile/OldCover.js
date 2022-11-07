import { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutSide from "../../helpers/useClickOutSide";

export default function OldCover({ photos, setCoverPicture, setShow }) {
  const { user } = useSelector((state) => ({ ...state }));
  const Ref = useRef(null)
  useClickOutSide(Ref,()=>setShow(false))
  return (
    <div className="blur">
      <div className="postBox seclectCoverBox" ref={Ref}>
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Select Photos</span>
        </div>
        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Recent Photo</div>
          {/* <div className="selectCoverBox_link">Other Photos</div> */}
        </div>
        <div className="old_pictures_wrap scrollbar">
          <h4>Choose from your Cover pictures</h4>
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (img) => img.folder === `${user.username}/cover_pictures`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    alt=""
                    style={{ width: "100px" }}
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
          <h4>Other Pictures from your wall</h4>
          <div className="old_pictures">
            {photos &&
              photos
                .filter((img) => img.folder === `${user.username}/post_images`)
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    alt=""
                    style={{ width: "100px" }}
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
