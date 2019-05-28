import $axios from "./http";
import { URL_ADDRESS } from "../constants";

export const deviceDashboard = (data = {}) => {
  return $axios.post(URL_ADDRESS["DEVICE_DASHBOARD"], data);
}


export const levelWarm = (data = {}) => {
  return $axios.post(URL_ADDRESS["LEVEL_WARM"], data);
}

export const immersionWarm = (data = {}) => {
  return $axios.post(URL_ADDRESS["IMMERSION_WARM"], data);
}