import axios from "../configApi";

export const getServices = async params => {
  try {
    const res = await axios.get(`/services`, {
      params: params
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getServiceDetail = async id => {
  try {
    const res = await axios.get(`/services/${id}`);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
