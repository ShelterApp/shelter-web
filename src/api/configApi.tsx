import axios from "axios";

const persistJson = localStorage.getItem("persist:root");
const auth: any = JSON.parse(JSON.parse(persistJson || "{}").auth || "{}");

const APIInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DOMAIN_API}`
});
// headers: {"Access-Control-Allow-Origin": "*"}

//
export const setToken = (token: string) => {
  APIInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
};
// console.log(auth.idToken)
setToken(auth.idToken);

export default APIInstance;
