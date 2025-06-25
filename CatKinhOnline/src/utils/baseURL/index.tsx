import axios from "axios";

const request = axios.create({  
  baseURL: "https://localhost:7057/api/", // Sử dụng URL Của APIGateWay
  // baseURL: "https://c6chjsrv-7057.asse.devtunnels.ms/api/", // Sử dụng URL Của APIGateWay
});

export default request;