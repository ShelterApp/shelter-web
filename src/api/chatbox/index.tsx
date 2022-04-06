import axios from "../configApi";
import { removeEmptyObject } from "common/helpers";

export const chatboxAPI = async params => {
  try {
    const location = JSON.parse(
      sessionStorage.getItem("@shelter_location_value_chatbox")
    );
    const res = await axios.post(
      `/bot/query`,
      removeEmptyObject({
        ...params,
        location,
        userTimezone: new Date().getTimezoneOffset()
      })
    );

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
