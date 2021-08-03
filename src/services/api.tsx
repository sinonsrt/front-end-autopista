import axios from "axios";

const api = axios.create({
  baseURL: "http://25.99.194.144:3333"
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("@ms1cte:token");
      localStorage.removeItem("@ms1cte:users");
      localStorage.removeItem("@ms1cte:environment");
      window.location.replace("");
    }
    return Promise.reject(error);
  }
);

export default api;
