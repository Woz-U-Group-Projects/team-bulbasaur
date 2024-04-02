import authAxios from "./authAxios";

const userBaseUrl = "/api/users";
const friendsBaseUrl = `${userBaseUrl}/friends`;

/**
 * @typedef {Object} actionoObj
 * @property {string} key
 * @property {function} action
 *
 * @typedef {Object.<string, actionoObj>} userActions
 *
 * @type {userActions}
 */
const userActions = {
  getUsers: {
    key: 'GET_USERS',
    /** @returns {Promise<import("../../../server-express-mysql/controllers/UserContoller").user[]>} */
    action: async () => {
      try {
        const req = await authAxios.get(`${userBaseUrl}`);
        const res = await req.data;
        return res.users;
      } catch (error) {
        console.log(error);
      }
    }
  },
  getUser: {
    key: 'GET_USER',
    /** @param {(string|number)} userId */
    action: async (userId) => {
      try {
        const req = await authAxios.get(`${userBaseUrl}/${userId}`);
        const res = await req.data;
        return res.user;
      } catch (error) {
        console.log(error);
      }
    }
  },
  addFriend: {
    key: 'ADD_FRIEND',
    /** @param {(string|number)} addresseeId */
    action: async (addresseeId) => {
      try {
        if ((await authAxios.get(`${friendsBaseUrl}/add/${addresseeId}`)).status !== 200) {
          setTimeout(() => { alert('Failed to add friend') }, 100);
          return;
        }
        return addresseeId;
      } catch (error) {
        console.log(error);
      }
    }
  },
  acceptRequest: {
    key: 'ACCEPT_REQUEST',
    /** @param {(string|number)} addresseeId */
    action: async (addresseeId) => {
      try {
        if ((await authAxios.get(`${friendsBaseUrl}/accept/${addresseeId}`)).status !== 200) {
          setTimeout(() => { alert('Failed to accept friend') }, 100);
          return;
        }
        return addresseeId;
      } catch (error) {
        console.log(error);
      }
    }
  },
  confirmAccepted: {
    key: 'ACCEPT_REQUEST',
    /** @param {(string|number)} addresseeId */
    action: async (addresseeId) => {
      try {
        if ((await authAxios.get(`${friendsBaseUrl}/confirm/accepted/${addresseeId}`)).status !== 200) {
          setTimeout(() => { alert('Failed to confirm friend') }, 100);
          return;
        }
        return addresseeId;
      } catch (error) {
        console.log(error);
      }
    }
  },
  rejectRequest: {
    key: 'REJECT_REQUEST',
    /** @param {(string|number)} addresseeId */
    action: async (addresseeId) => {
      try {
        if ((await authAxios.get(`${friendsBaseUrl}/reject/${addresseeId}`)).status !== 200) {
          setTimeout(() => { alert('Failed to reject friend') }, 100);
          return;
        }
        return addresseeId;
      } catch (error) {
        console.log(error);
      }
    }
  },
  confirmRejected: {
    key: 'REJECT_REQUEST',
    /** @param {(string|number)} addresseeId */
    action: async (addresseeId) => {
      try {
        if ((await authAxios.get(`${friendsBaseUrl}/confirm/rejected/${addresseeId}`)).status !== 200) {
          setTimeout(() => { alert('Failed to confirm friend') }, 100);
          return;
        }
        return addresseeId;
      } catch (error) {
        console.log(error);
      }
    }
  },
  deleteFriend: {
    key: 'DELETE_FRIEND',
    /** @param {(string|number)} addresseeId */
    action: async (addresseeId) => {
      try {
        if ((await authAxios.get(`${friendsBaseUrl}/delete/${addresseeId}`)).status !== 200) {
          setTimeout(() => { alert('Failed to delete friend') }, 100);
          return;
        }
        return addresseeId;
      } catch (error) {
        console.log(error);
      }
    }
  },
}

export default userActions;