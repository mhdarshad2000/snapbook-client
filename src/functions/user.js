import { Axios } from "../helpers/Axios";

export const updateprofilePicture = async (url, token) => {
  try {
    const { data } = await Axios.put(
      "/updateProfilePicture",
      {
        url,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const updatecoverPicture = async (url, token) => {
  try {
    const { data } = await Axios.put(
      "/updateCoverPicture",
      {
        url,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const addFriend = async (id, token) => {
  try {
    const { data } = await Axios.put(
      `addFriend/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
export const cancelRequests = async (id, token) => {
  try {
    const { data } = await Axios.put(
      `cancelRequests/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
export const acceptRequset = async (id, token) => {
  try {
    const { data } = await Axios.put(
      `acceptRequset/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
export const unFriend = async (id, token) => {
  try {
    const { data } = await Axios.put(
      `unFriend/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
export const deleteRequest = async (id, token) => {
  try {
    const { data } = await Axios.put(
      `deleteRequest/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
export const searchUser = async (searchTerm, token) => {
  try {
    const { data } = await Axios.post(
      `search/${searchTerm}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const addToSearchHistory = async (searchUser, token) => {
  try {
    const { data } = await Axios.put(
      "/addToSearchHistory",
      { searchUser },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const getSearchHistory = async (token) => {
  try {
    const { data } = await Axios.get("/getSearchHistory", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const getFriendsPageInfos = async (token) => {
  try {
    const { data } = await Axios.get("/getFriendsPageInfos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateStory = async (token, url, text) => {
  try {
    const { data } = await Axios.post(
      "/updateStory",
      { url, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getFriendSuggestions = async (user) => {
  try {
    const { data } = await Axios.get("/friendSuggestions", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  } catch (error) {
    return error.message;
  }
};
