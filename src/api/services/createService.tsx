import axios from "../configApi";

export const createService = async obj => {
  try {
    const res = await axios.post(`/services`, obj);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateService = async obj => {
  try {
    const res = await axios.put(`/services/${obj.id}`, obj);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
