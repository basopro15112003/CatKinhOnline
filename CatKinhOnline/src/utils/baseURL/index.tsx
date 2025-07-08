import axios from "axios";

const request = axios.create({  
  baseURL: "https://localhost:7057/api/", // Sử dụng URL Của APIGateWay
  // baseURL: "https://7nt1w10n-7057.asse.devtunnels.ms/api/", // Sử dụng URL Của APIGateWay
});

request.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default request;