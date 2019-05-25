import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import { Toast } from "antd-mobile";
import { HTTP_ERROR } from "../constants/httpError";

const $axios = axios.create({
  baseURL: "",
  timeout: 15000,
  headers: {
    "Accept": "application/json",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Origin": "*",
    "credentials": "same-origin",
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

$axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.data) {
    config.data = qs.stringify(config.data);
  }
  return config;
});

$axios.interceptors.response.use((response: AxiosResponse<any>) => {
  return response.data;
}, (error: any) => {
  // error.response && Toast.fail(HTTP_ERROR[])
  console.log(error);
});

export default $axios;
