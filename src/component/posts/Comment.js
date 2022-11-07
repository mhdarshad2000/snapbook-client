import Moment from "react-moment";
import { Axios } from "../../helpers/Axios";
import "./style.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

export default function Comment({
  comment,
  comments,
  setComments,
  postId,
  user,
}) {
  const [commentOption, setCommentOption] = useState(false);
  const deleteComment = async (commentId, postId) => {
    try {
      const { data } = await Axios.put(
        `/deleteComment/${commentId}`,
        {
          postId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="comment">
      <img src={comment.commentBy.picture} alt="" className="comment_img" />
      <div className="comment_col">
        <div className="flex report">
          <div className="comment_wrap ">
            <div className="comment_name">
              {comment.commentBy.first_name} {comment.commentBy.last_name}
            </div>
            <div className="comment_text">{comment.comment}</div>
          </div>
          <div className="comment_menu">
            <div
              className="small_circle ml"
              onClick={() => setCommentOption((prev) => !prev)}
            >
              <MoreVertIcon />
            </div>
            {commentOption && (
              <ul>
                {comment.commentBy.username === user.username && (
                  <li onClick={() => deleteComment(comment._id, postId)}>
                    Delete
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        {comment.image && (
          <img src={comment.image} alt="" className="comment_image" />
        )}
        <div className="comment_actions">
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
}
