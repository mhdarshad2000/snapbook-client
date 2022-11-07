import { useState, useEffect, useRef } from "react";
import Picker from "emoji-picker-react";
import { commentPost } from "../../functions/posts";
import { uploadImages } from "../../functions/uploadImages";
import dataURItoBlob from "../../helpers/DataUriToBlob";
import { SquareLoader } from "react-spinners";

export default function CreateComment({ user, postId, setComments }) {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const [loading, setLoading] = useState(false);
  const textRef = useRef(null);
  const imgInput = useRef(null);
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp"
    ) {
      setError(`${file.name} format is not supported`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(
        `${file.name} size is too large, please select files less than 5 mb.`
      );
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      console.log(1);
      if (commentImage != "") {
        setLoading(true);
        const img = dataURItoBlob(commentImage);
        const path = `${user.username}/post_images/${postId}`;

        let formData = new FormData(); //formdata object
        formData.append("path", path); //append the values with key, value pair
        formData.append("file", img);
        const imgComment = await uploadImages(formData, path, user.token);
        const comment = await commentPost(
          text,
          imgComment[0].url,
          postId,
          user.token
        );
        setComments(comment);
        setLoading(false);
        setText("");
        setCommentImage("");
      } else {
        setLoading(true);
        const comment = await commentPost(text, "", postId, user.token);
        setComments(comment);
        setLoading(false);
        setText("");
        setCommentImage("");
      }
    }
  };

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
            onChange={handleImage}
          />
          {error && (
            <div className="post_error comment_error">
              <div className="post_error_error">{error}</div>
              <button
                className="blue_btn"
                onClick={() => {
                  setError("");
                }}
              >
                Try Again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Post your comment....."
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleComment}
          />
          <div className="comment_circle" style={{ marginTop: "5px" }}>
            <SquareLoader
              loading={loading}
              width={20}
              color="#1876f2"
              size={20}
            />
          </div>
          <div
            className="comment_circle_icon hover3"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover3"
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => {
              setCommentImage("");
            }}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
}
