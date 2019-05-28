import $axios from "./http";
import { URL_ADDRESS } from "../constants";

export const deviceDashboard = (data = {}) => {
  return $axios.post(URL_ADDRESS["DEVICE_DASHBOARD"], data);
}

export const levelWarn = (data = {}) => {
  return $axios.post(URL_ADDRESS["LEVEL_WARN"], data);
}

export const levelFault = (data = {}) => {
  return $axios.post(URL_ADDRESS["LEVEL_FAULT"], data);
}

export const levelNormal = (data = {}) => {
  return $axios.post(URL_ADDRESS["LEVEL_NORMAL"], data);
}

export const immersionWarn = (data = {}) => {
  return $axios.post(URL_ADDRESS["IMMERSION_WARN"], data);
}

export const immersionFault = (data = {}) => {
  return $axios.post(URL_ADDRESS["IMMERSION_FAULT"], data);
}

export const immersionNormal = (data = {}) => {
  return $axios.post(URL_ADDRESS["IMMERSION_NORMAL"], data);
}