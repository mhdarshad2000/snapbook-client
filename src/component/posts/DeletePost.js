import { useRef } from "react";
import useClickOutSide from "../../helpers/useClickOutSide";
import "./style.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { deletePost } from "../../functions/posts";

export default function DeletePost({ setMenuItems, postId, token, postRef }) {
  const deleteHandler = async () => {
    const res = await deletePost(postId, token);
    console.log(res)
    if(res.status==="ok"){
      setMenuItems(false)
      postRef.current.style.display ="none"
    }
  };
  const deleteRef = useRef(null);
  useClickOutSide(deleteRef, () => setMenuItems(false));
  return (
    <ul className="post_menu">
      <li className="hover1" ref={deleteRef} onClick={() => deleteHandler()}>
        <AiOutlineDelete size={30} />
        Delete Post
      </li>
    </ul>
  );
}
