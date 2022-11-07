import EmojiPickerBackground from "./EmojiPickerBackground";
import { useRef } from "react";

export default function ImagePreview({
  text,
  user,
  setText,
  images,
  setImages,
  setShowPreview,
  setError,
}) {
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== "image/jpg" &&
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/gif" &&
        img.type !== "image/webp"
      ) {
        setError(`${img.type} format is not supported`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.size} is greater than 5mb`);
        files = files.filter((item) => item.name !== img.name);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };
  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBackground text={text} user={user} setText={setText} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button className="hover1 ">
                <i className="edit_icon"></i>
                <span>Edit</span>
              </button>
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                <span>Add Photo/Video </span>
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="small_white_circle"
              onClick={() => {
                setShowPreview(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">
                <i className="addPhoto_icon icon_add_photo"></i>
                <span>Place Your Photo/Video here</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
