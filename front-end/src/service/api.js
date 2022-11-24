import axios from "axios";

const instance = axios.create({
  baseURL: "http://172.20.40.195:5000/api/", //sabará-api
});

export { instance as axios };
