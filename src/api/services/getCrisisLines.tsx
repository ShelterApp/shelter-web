import axios from "../configApi";
import { removeEmptyObject } from "common/helpers";

export const getCrisisLines = async params => {
  try {
    const res = await axios.get(`/crisis-lines`, {
      params: removeEmptyObject(params)
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCrisisLineDetail = async id => {
  try {
    const res = await axios.get(`/crisis-lines/${id}`);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteCrisisline = async id => {
  try {
    const res = await axios.delete(`/crisis-lines/${id}`);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
