import { Axios } from "../helpers/Axios";

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await Axios.post(`/uploadImages`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
