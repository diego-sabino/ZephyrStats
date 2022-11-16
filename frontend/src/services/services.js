import axios from 'axios';

const HOST = "zephyrstats-backend-production.up.railway.app";
const PROTOCOL = "https";

const api = axios.create({
  baseURL: `${PROTOCOL}://${HOST}`,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api;
