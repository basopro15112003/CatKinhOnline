import axios from "axios";

const request = axios.create({
  baseURL: "https://localhost:7057/api/", // Sử dụng URL Của APIGateWay
});

export default request;