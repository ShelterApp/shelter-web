import axios, { setToken } from "../configApi";

export const login = async form => {
  try {
    const res = await axios.post(`/auth/sign-in`, form);
    console.log(res);
    res.data && setToken(res.data.token);
    return res.data;
  } catch (error) {
    return error.response.data;
    // return Promise.reject(error);
  }
};

export const verifyAccessToken = async data => {
  try {
    const res = await axios.post(`/auth/verify-access-token`, data);
    console.log(res);
    return res.data;
  } catch (error) {
    return error.response.data;
    // return Promise.reject(error);
  }
};
