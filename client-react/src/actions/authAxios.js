import axios from 'axios';

const cookie = document.cookie

const authAxios = axios.create({
  headers: {
    withCredentials: true,
    authorization: `Bearer ${cookie}`
  },
  credentials: 'same-origin'
});

export default authAxios;
