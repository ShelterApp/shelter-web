import axios from "../configApi";

export const resetPassword = async email => {
  try {
    const res = await axios.post(`/auth/request-reset-password`, {
      email: email.toLowerCase()
    });
    return res.data;
  } catch (error) {
    return error.response.data;
    // return Promise.reject(error);
  }
};

export const changePassword = async obj => {
  try {
    const res = await axios.put(`/auth/password`, obj);
    return res.data;
  } catch (error) {
    return error.response.data;
    // return Promise.reject(error);
  }
};

export const resetPasswordWithToken = async obj => {
  try {
    const res = await axios.post(`/auth/password`, obj);
    return res.data;
  } catch (error) {
    return error.response.data;
    // return Promise.reject(error);
  }
};
