import axios from "axios";

export const getLocationAPIMap = async coords => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[1]},${coords[0]}&key=${process.env.REACT_APP_GOOGLE_MAPS_APIKEY}`
    );
    return res.data;
  } catch (error) {
    // return error.response.data;
    return Promise.reject(error);
  }
};
