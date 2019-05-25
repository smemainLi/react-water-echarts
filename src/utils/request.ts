import $axios from "./http";
import { URL_ADDRESS } from "../constants";

export const levelWarm = (data = {}) => {
  return $axios.post(URL_ADDRESS["LEVEL_WARM"], data);
}