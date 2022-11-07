import { useEffect, useRef, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import Header from "../../component/header/Header";
import Story from "../../component/home/stories/Story";
import LeftHome from "../../component/home/left/LeftHome";
import CreatePost from "../../component/home/createPosts/CreatePost";
import SendVerification from "../../component/home/sendVerification/SendVerification";
import Post from "../../component/posts/posts";
import SavedPost from "../savedPost/SavedPost";
import FriendSuggestions from "../../component/home/right/FriendSuggestions";

export default function Home({ setVisible, posts, loading }) {
  const { user } = useSelector((user) => ({ ...user }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" />
      <div className="home_middle" ref={middle}>
        <Story />
        {user.verified ? "" : <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.length &&
            posts.map((post) => (
              <Post key={post._id} post={post} user={user} />
            ))}
        </div>
      </div>
      <LeftHome user={user} />
      <FriendSuggestions user={user} />
    </div>
  );
}
