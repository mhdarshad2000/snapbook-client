import { Grid, Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Header from "../../component/header/Header";
import LeftHome from "../../component/home/left/LeftHome";
import Post from "../../component/posts/posts";
import { Axios } from "../../helpers/Axios";

export default function SavedPost() {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [savedPost, setSavedPost] = useState([]);
  const [height, setHeight] = useState();
  const [filterPost, setFilterPost] = useState(false);
  useEffect(() => {
    getSavedPost();
  }, [filterPost]);
  const getSavedPost = async () => {
    try {
      const { data } = await Axios.get("/savedPost", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSavedPost(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [height]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box className="home">
          <Header page="home" />
          <Box className="home_middle" ref={middle}>
            <Box className="posts">
              {savedPost?.length
                ? savedPost.map((saved) => (
                    <Post
                      key={saved._id}
                      post={saved}
                      user={user}
                      setFilterPost={setFilterPost}
                    />
                  ))
                : "Nothing Saved"}
            </Box>
          </Box>
          <LeftHome user={user} />
        </Box>
      </Grid>
    </Grid>
  );
}
