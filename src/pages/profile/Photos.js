import { Axios } from "../../helpers/Axios";
import { FocusedText } from "../../styledComponent/styled";

export default function Photos({ username, token, photos }) {
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? " 1 photo"
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources && photos.resources.length ? (
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))
        ) : (
          <FocusedText className="no_posts">No posts added</FocusedText>
        )}
      </div>
    </div>
  );
}
