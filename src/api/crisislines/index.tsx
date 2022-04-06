import axios from "../configApi";

export const createCrisisLine = async obj => {
  try {
    const res = await axios.post(`/crisis-lines`, obj);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCrisisLine = async obj => {
  try {
    const res = await axios.put(`/crisis-lines/${obj.id}`, obj);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
