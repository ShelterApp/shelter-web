import axios from "./configApi";

export const getAboutPage = async () => {
  try {
    const res = await axios.get(`/static-pages/ABOUT`);
    return res.data;
  } catch (error) {
    // return error.response.data;
    return Promise.reject(error);
  }
};

export const getTermsPage = async () => {
  try {
    const res = await axios.get(`/static-pages/TERMS`);
    return res.data;
  } catch (error) {
    // return error.response.data;
    return Promise.reject(error);
  }
};

export const getPrivacyPage = async () => {
  try {
    const res = await axios.get(`/static-pages/PRIVACY`);
    return res.data;
  } catch (error) {
    // return error.response.data;
    return Promise.reject(error);
  }
};

export const getFAQPage = async () => {
  try {
    const res = await axios.get(`/static-pages/FAQ`);
    return res.data;
  } catch (error) {
    // return error.response.data;
    return Promise.reject(error);
  }
};
