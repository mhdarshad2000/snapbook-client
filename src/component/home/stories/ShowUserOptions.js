import React from "react";
import Stories from "react-insta-stories";
import Moment from "react-moment";
import { Box } from "@mui/material";
const stories = [];

export default function ShowUserOptions({
  setUserOptions,
  setStory,
  myStories,
}) {
  myStories.map((storyList) => {
    stories.push({
      url: storyList.image,
      header: {
        heading: `${storyList.user.first_name} ${storyList.user.last_name}`,
        subheading: <Moment fromNow>{storyList.createdAt}</Moment>,
        profileImage: `${storyList.user.picture}`,
      },
    });
  });
  return (
    <Box className="blur">
      <Box className="story_view">
        <Stories
          stories={stories}
          defaultInterval={2000}
          width={400}
          height={625}
          isPaused={true}
          onAllStoriesEnd={() => {
            setUserOptions(false);
            setStory(false);
            stories.length = 0;
          }}
        />
      </Box>
    </Box>
  );
}
