import "./style.css";
import { useState, useRef } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../../helpers/useClickOutSide";
import { createPost } from "../../../functions/posts";
import PostError from "./PostError";
import dataURItoBlob from "../../../helpers/DataUriToBlob";
import { uploadImages } from "../../../functions/uploadImages";

export default function CreatePostPopup({ user, setVisible, posts, dispatch }) {
  const [text, setText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const popup = useRef(null);
  useClickOutside(popup, () => {
    setVisible(false);
  });
  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === "ok") {
        dispatch({ type: "POST_SUCCESS", payload: [response.data, ...posts] });
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((image) => {
        return dataURItoBlob(image);
      });
      const path = `${user.username}/post_images`;

      let formData = new FormData(); //formdata object
      formData?.append("path", path); //append the values with key, value pair
      postImages?.forEach((image) => {
        formData.append("file", image);
      });
      const response = await uploadImages(formData, path, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res.status === "ok") {
        dispatch({ type: "POST_SUCCESS", payload: [res.data, ...posts] });
        setText("");
        setImages("");
        setVisible(false);
      } else {
        console.log(res);
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === "ok") {
        dispatch({ type: "POST_SUCCESS", payload: [response.data, ...posts] });
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }
  };
  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setVisible(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
          </div>
        </div>

        {!showPreview ? (
          <>
            <EmojiPickerBackground
              text={text}
              setText={setText}
              user={user}
              showPreview={showPreview}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            images={images}
            setImages={setImages}
            setShowPreview={setShowPreview}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPreview={setShowPreview} />
        <button
          className="post_submit"
          onClick={() => {
            postSubmit();
          }}
          disabled={loading}
        >
          {loading ? <BounceLoader loading={loading} size={30} /> : "Post"}
        </button>
      </div>
    </div>
  );
}
