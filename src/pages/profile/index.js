import { useEffect, useReducer, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/Reducers";
import { Axios } from "../../helpers/Axios";
import Header from "../../component/header/Header";
import { useMediaQuery } from "react-responsive";
import "./style.scss";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import CreatePost from "../../component/home/createPosts/CreatePost";
import GridPosts from "./GridPosts";
import Post from "../../component/posts/posts";
import Photos from "./Photos";
import Friends from "./Friends";
import IntroProfile from "../../component/intro/IntroProfile";

export default function Profile({ setVisible }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({});
  const [othername, setOthername] = useState();
  var userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });

  useEffect(() => {
    getProfile();
  }, [userName]);
  useEffect(() => {
    setOthername(profile?.details?.othername);
  }, [profile]);
  var visitor = userName === user.username ? false : true;

  const path = `${userName}/post_images`;
  const max = 30;
  const sort = "desc";

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await Axios.get(`/getProfile/${userName}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await Axios.post(
            "/listImages",
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  const profileTop = useRef(null);
  const [height, setHeight] = useState();
  const leftSide = useRef(null);
  const [Leftheight, setLeftHeight] = useState();
  const [scrollheight, setScrollHeight] = useState();
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
    return () => {
      window.addEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading, scrollheight]);
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };
  return (
    <div className="profile">
      <Header />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          <Cover
            cover={profile.cover}
            visitor={visitor}
            photos={photos.resources}
          />
          <ProfilePictureInfos
            profile={profile}
            visitor={visitor}
            photos={photos.resources}
            othername={othername}
          />
          <ProfileMenu />
        </div>
      </div>

      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <div
              className={`profile_grid ${
                check && scrollheight >= height && Leftheight > 1000
                  ? "scrollFixed showLess"
                  : check &&
                    scrollheight >= height &&
                    Leftheight < 1000 &&
                    "scrollFixed showMore"
              }`}
            >
              <div className="profile_left" ref={leftSide}>
                <IntroProfile
                  detailss={profile.details}
                  visitor={visitor}
                  setOthername={setOthername}
                />
                <Photos
                  username={userName}
                  token={user.token}
                  photos={photos}
                />
                <Friends friends={profile.friends} />
              </div>
              <div className="profile_right">
                {!visitor && <CreatePost user={user} setVisible={setVisible} />}
                <GridPosts />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts
                      .sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      })
                      .map((post) => (
                        <Post
                          key={post._id}
                          post={post}
                          user={user}
                          profile
                          visitor={visitor}
                        />
                      ))
                  ) : (
                    <div className="no_post">No Posts To Display</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
