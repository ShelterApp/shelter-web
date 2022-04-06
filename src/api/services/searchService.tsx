import axios from "../configApi";

export const searchCityZip = async keyword => {
  try {
    const res = await axios.post(`/services/search-city-or-zip`, {
      keyword: keyword
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
