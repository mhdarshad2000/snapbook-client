import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Public from "../../svg/public";
import ReactsPopup from "./ReactsPopup";
import CreateComment from "./CreateComment";
import { getReacts, savePost } from "../../functions/posts";
import { reactPost } from "../../functions/posts";
import Comment from "./Comment";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DeletePost from "./DeletePost";
import Report from "./Report";

export default function Post({ post, user, profile, setFilterPost }) {
  const [visible, setVisible] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [checkSaved, setCheckSaved] = useState();
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(1);
  const [displayComment, setDisplayComment] = useState(false);
  const [menuItems, setMenuItems] = useState(false);

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);
  useEffect(() => {
    getPostReacts();
  }, [post]);

  const showMore = () => {
    setCount((prev) => prev + 3);
  };

  const getPostReacts = async () => {
    const res = await getReacts(post._id, user.token);
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };
  const postedUser = user.id === post?.user?._id;

  const reactHandler = (type) => {
    reactPost(post._id, type, user.token);
    if (check == type) {
      setCheck();
      let index = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts.findIndex((x) => x.react == type);
      let index1 = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    }
  };
  const saveHandler = async () => {
    await savePost({ postId: post._id, token: user.token });
    if (checkSaved) {
      setCheckSaved(false);
      setFilterPost((prev) => !prev);
    } else {
      setCheckSaved(true);
    }
  };
  const postRef = useRef(null);

  return (
    <div
      className="post"
      style={{ width: `${profile && "100%"}` }}
      ref={postRef}
    >
      <div className="post_header">
        <Link
          to={`/profile/${post?.user?.username}`}
          className="post_header_left"
        >
          <img src={post?.user?.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post?.user?.first_name} {post?.user?.last_name}
              <div className="updated_p">
                {post.type === "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type === "coverPicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } Cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div className="post_right_header">
          <div
            className={`post_header_right ${
              checkSaved ? "saved_bg" : "hover1"
            }`}
            onClick={() => saveHandler()}
          >
            <i className={`save_icon ${checkSaved && "invert"}`}></i>
          </div>

          <div className="small_circle" onClick={() => setMenuItems(true)}>
            <HiOutlineDotsVertical />
          </div>
        </div>
      </div>
      {menuItems &&
        (postedUser ? (
          <DeletePost
            setMenuItems={setMenuItems}
            postId={post._id}
            token={user.token}
            postRef={postRef}
          />
        ) : (
          <Report
            postId={post._id}
            token={user.token}
            setMenuItems={setMenuItems}
          />
        ))}
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="bg_text">{post.text}</div>
        </div>
      ) : (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post.images.length >= 5 && "grid_5"
              }
            >
              {post.images.slice(0, 5).map((img, i) => (
                <img src={img.url} key={i} alt="" className={`img-${i}`} />
              ))}
              {post.images.length > 5 ? (
                <div className="more_pics_shadow">
                  +{post.images.length - 5}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </>
      )}
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 3)
                .map(
                  (react) =>
                    react.count > 0 && (
                      <img
                        key={react.react}
                        src={`../../../reacts/${react.react}.svg`}
                        alt=""
                      />
                    )
                )}
          </div>
          <div className="reacts_count_num">{total > 0 && total}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">{comments?.length} comments</div>
          <div className="share_count">1 share</div>
        </div>
      </div>
      <div className="post_actions">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => {
            reactHandler(check ? check : "like");
          }}
        >
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt=""
              className="small_react"
              style={{ width: "20px" }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `
          
          ${
            check === "like"
              ? "#4267b2"
              : check === "love"
              ? "#f63459"
              : check === "haha"
              ? "#f7b125"
              : check === "sad"
              ? "#f7b125"
              : check === "wow"
              ? "#f7b125"
              : check === "angry"
              ? "#e4605a"
              : ""
          }
          `,
            }}
          >
            {check ? check : "Like"}
          </span>
        </div>
        <div
          className="post_action hover1"
          onClick={() => setDisplayComment(true)}
        >
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      {displayComment && (
        <div className="comments_wrap">
          <div className="close_comment">
            <div
              className="small_circle hover1"
              onClick={() => setDisplayComment(false)}
            >
              <i className="exit_icon"></i>
            </div>
          </div>
          <div className="comments_order">
            <CreateComment
              user={user}
              postId={post._id}
              setComments={setComments}
            />
            {comments &&
              comments
                .sort((a, b) => {
                  return new Date(b.commentAt) - new Date(a.commentAt);
                })
                .slice(0, count)
                .map((comment, i) => (
                  <Comment
                    user={user}
                    comments={comments}
                    setComments={setComments}
                    postId={post._id}
                    comment={comment}
                    key={i}
                  />
                ))}
            {count < comments.length && (
              <div className="view_comments" onClick={() => showMore()}>
                Load more comments...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
