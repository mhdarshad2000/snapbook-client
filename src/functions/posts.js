import { Axios } from "../helpers/Axios";

export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  token
) => {
  try {
    const { data } = await Axios.post(
      "/createPost",
      {
        type,
        background,
        text,
        images,
        user,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const reactPost = async (postId, react, token) => {
  try {
    const { data } = await Axios.put(
      "/reactPost",
      {
        postId,
        react,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
export const getReacts = async (postId, token) => {
  try {
    const { data } = await Axios.get(`/getReacts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
export const commentPost = async (comment, image, postId, token) => {
  try {
    const { data } = await Axios.put(
      "/comment",
      {
        comment,
        image,
        postId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const savePost = async ({ postId, token }) => {
  try {
    const { data } = await Axios.put(
      `/savePost/${postId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
export const deletePost = async (postId, token) => {
  try {
    const { data } = await Axios.delete(`/deletePost/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: "ok" };
  } catch (error) {
    return error.response.data.message;
  }
};
