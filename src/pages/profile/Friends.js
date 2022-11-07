import { Link } from "react-router-dom";
export default function Friends({ friends }) {
  console.log(friends);
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Friends
        <Link to="/friends" className="profile_header_link">See all Friends</Link>
      </div>
      <div className="profile_card_count">
        {friends?.length === 0
          ? ""
          : friends?.length === 1
          ? " 1 friend"
          : `${friends?.length} friends`}
      </div>
      <div className="profile_card_grid">
        {friends &&
          friends.slice(0, 9).map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              className="profile_photo_card"
              key={friend._id}
            >
              <img src={friend.picture} alt="" />
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
