import { Dots, Feeling, Photo } from "../../../svg";

export default function AddToYourPost({ setShowPreview }) {
  return (
    <div className="addtoyourpost">
      <div className="addto_text">Add to your post</div>
      <div
        className="post_header_right_hover1"
        onClick={() => {
          setShowPreview(true);
        }}
      >
        <Photo color="#45bd62" />
      </div>
    </div>
  );
}
