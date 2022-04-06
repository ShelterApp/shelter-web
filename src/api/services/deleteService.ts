import axios from "../configApi";

export const deleteService = async id => {
  try {
    const res = await axios.delete(`/services/${id}`);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
