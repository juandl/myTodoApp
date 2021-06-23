import axios from 'axios';

//Instance Axios
const Instance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:4000/api',
});

export default Instance;
