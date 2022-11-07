import { Link } from "react-router-dom";
import { Dots } from "../../svg";
export default function ProfileMenu() {
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <Link to="/" className="profile_menu_active">Posts</Link>
        <Link to="/" className="hover1">About</Link>
        <Link to="/friends" className="hover1">Friends</Link>
        <Link to="/" className="hover1">Photos</Link>
        {/* <Link to="/" className="hover1">Vidoes</Link> */}
        {/* <Link to="/" className="hover1">More</Link> */}
        {/* <div className="p10_dots">
            <Dots/>
        </div> */}
      </div>
    </div>
  );
}
