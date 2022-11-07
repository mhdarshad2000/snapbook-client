import { Box } from "@mui/material";
import Stories from "react-insta-stories";
import Moment from "react-moment";
const stories = [];

export default function ShowStory({ story, setShowStory }) {
  story.map((storyList) => {
    console.log(storyList);
    stories.push({
      url: storyList.image,
      header: {
        heading: `${storyList?.user?.first_name} ${storyList?.user?.last_name}`,
        subheading: <Moment fromNow>{storyList?.createdAt}</Moment>,
        profileImage: `${storyList?.user?.picture}`,
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
            setShowStory(false);
            stories.length = 0;
          }}
        />
      </Box>
    </Box>
  );
}
