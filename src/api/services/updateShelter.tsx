import axios from "../configApi";
// import { removeEmptyObject } from "common/helpers";

export const getBeds = async () => {
  try {
    const res = await axios.get(`/services/beds`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBeds = async params => {
  try {
    const res = await axios.post(`/services/update-available-beds`, params);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const approveServices = async params => {
  try {
    const res = await axios.post(`/services/approve-services`, params);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeServices = async params => {
  try {
    const res = await axios.post(`/services/remove-services`, params);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
