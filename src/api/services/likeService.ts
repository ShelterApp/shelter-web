import axios from "../configApi";

export const likeService = async id => {
  try {
    const res = await axios.post(`/services/${id}/likes`);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
