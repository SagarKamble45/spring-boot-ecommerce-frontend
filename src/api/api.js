// import axios from "axios";

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
// });

// export default api;


import axios from "axios";

console.log("VITE_BACK_END_URL:", import.meta.env.VITE_BACK_END_URL);
console.log("All env vars:", import.meta.env);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  withCredentials: true,
});

export default api;
