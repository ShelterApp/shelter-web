import axios from "../configApi";

export const signup = async form => {
  try {
    const res = await axios.post(`/auth/sign-up`, form);
    console.log(res);
    return res.data;
  } catch (error) {
    return error.response.data;
    // return Promise.reject(error);
  }
};
