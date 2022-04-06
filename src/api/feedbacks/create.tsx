import axios from "../configApi";

export const createFeedback = async form => {
  try {
    const res = await axios.post(`/feedbacks/app`, form);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createFeedbackService = async form => {
  try {
    const res = await axios.post(`/feedbacks/service`, form);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const archiveFeedback = async id => {
  try {
    const res = await axios.post(`feedbacks/${id}/archive`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteFeedback = async id => {
  try {
    const res = await axios.delete(`feedbacks/${id}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
