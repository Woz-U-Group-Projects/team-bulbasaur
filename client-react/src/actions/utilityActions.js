import axios from "axios";
import authAxios from "./authAxios";

const baseUrl = '/api';

/**
 * @typedef {Object} actionoObj
 * @property {string} key
 * @property {function} action
 *
 * @typedef {Object.<string, actionoObj>} utilActions
 *
 * @type {utilActions}
 */
const utilActions = {
  verifyLogin: {
    key: "LOGIN",
    /** @returns {Promise<(import("../../../server-express-mysql/controllers/UserContoller").user|null)>} */
    action: async () => {
      try {
        const req = await authAxios.get(`${baseUrl}/verify`);
        const res = await req.data;
        if (!req.status || req.status !== 200) {
          setTimeout(() => { alert('Must Login Again') }, 100);
          localStorage.removeItem('user');
          return;
        }
        return res.user;
      } catch (error) {
        console.log(error);
      }
    }
  },
  login: {
    key: "LOGIN",
    action: async (user) => {
      try {
        const req = await axios.post(`${baseUrl}/login`, { user });
        const res = await req.data;
        if (!req.status || req.status !== 200) {
          setTimeout(() => { alert('Login Failed') }, 100);
          return;
        }
        return res.user;
      } catch (error) {
        console.log(error);
      }
    }
  },
  signup: {
    key: "LOGIN",
    action: async (user) => {
      try {
        const req = await axios.post(`${baseUrl}/signup`, { user });
        const res = await req.data;
        if (!req.status || req.status !== 200) {
          setTimeout(() => { alert('Signup Failed') }, 100);
          return;
        }
        return res.user;
      } catch (error) {
        console.log(error);
      }
    }
  },
  logout: {
    key: "LOGOUT",
    action: async () => {
      try {
        if ((await authAxios.get(`${baseUrl}/logout`)).status !== 200) {
          setTimeout(() => { alert('Logout Failed') }, 100);
          return;
        }
        localStorage.removeItem('user');
        return;
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export default utilActions;