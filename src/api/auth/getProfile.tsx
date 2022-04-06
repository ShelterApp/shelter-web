import axios from "../configApi";

export const getProfile = async () => {
  try {
    const res = await axios.get(`/auth/profile`);
    if (res.data) return res.data;
  } catch (error) {
    return error.response.data;
    // return Promise.reject(error);
  }
};

export const getReportNotifcations = async () => {
  try {
    const res = await axios.post(`/auth/report-notifications`);
    return res.data;
  } catch (error) {
    return error.response.data;
    // return Promise.reject(error);
  }
};
