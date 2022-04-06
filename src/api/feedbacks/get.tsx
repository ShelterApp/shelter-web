import axios from "../configApi";
import { removeEmptyObject } from "common/helpers";

export const getFeedbacks = async params => {
  try {
    const res = await axios.get(`/feedbacks`, {
      params: removeEmptyObject(params)
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
