import { Axios } from "../helpers/Axios";
export const AllUsers = async (admin) => {
  const { data } = await Axios.get("/admin/getUsers", {
    headers: {
      Authorization: `Bearer ${admin.token}`,
    },
  });
  return data;
};

export const deletePostByAdmin = async (postId, token) => {
  try {
    const { data } = await Axios.delete(`/admin/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return data
  } catch (error) {
    console.log(error.message);
  }
};
