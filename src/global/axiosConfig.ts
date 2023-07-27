import axios from "axios";
import { jwtManager } from "./jwtManager";

export default function configAxios() {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.interceptors.request.use(
    (config) => {
      const token = jwtManager?.get();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );
}
