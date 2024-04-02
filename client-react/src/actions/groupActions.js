import authAxios from "./authAxios";

const baseGroupUrl = "/api/groups", baseMembershipUrl = `${baseGroupUrl}/membership`;

/**
 * @typedef {Object} actionoObj
 * @property {string} key
 * @property {function} action
 *
 * @typedef {Object.<string, actionoObj>} groupActions
 *
 * @type {groupActions}
 */
const groupActions = {
  createGroup: {
    key: 'CREATE_GROUP',
    /** 
     * @param {{ name: string, description: string, isPrivate: boolean }} obj
     * @returns {Promise<import("../../../server-express-mysql/controllers/GroupController").group>}
     */
    action: async (obj) => {
      try {
        const req = await authAxios.post(`${baseGroupUrl}`, obj);
        const res = await req.data;
        return res.group;
      } catch (error) {
        console.log(error);
      }
    }
  },
  getGroups: {
    key: 'GET_GROUPS',
    /** @returns {Promise<import("../../../server-express-mysql/controllers/GroupController").group[]>} */
    action: async () => {
      try {
        const req = await authAxios.get(`${baseGroupUrl}`);
        const res = await req.data;
        return res.groups;
      } catch (error) {
        console.log(error);
      }
    }
  },
  getGroup: {
    key: 'GET_GROUP',
    /** 
     * @param {(string|number)} groupId
     * @returns {Promise<import("../../../server-express-mysql/controllers/GroupController").group>}
     */
    action: async (groupId) => {
      try {
        const req = await authAxios.get(`${baseGroupUrl}/${groupId}`);
        const res = await req.data;
        return res.group;
      } catch (error) {
        console.log(error);
      }
    }
  },
  editGroup: {
    key: 'EDIT_GROUP',
    /** 
     * @param {{ groupId: (string|number), name: string, description: string, isPrivate: boolean }} group
     * @returns {Promise<import("../../../server-express-mysql/controllers/GroupController").group>}
     */
    action: async ({ groupId, description }) => {
      try {
        if ((await authAxios.put(`${baseGroupUrl}/${groupId}`, { description })).status !== 200) {
          setTimeout(() => alert('was unable to edit group'), 100);
          return;
        }
        return { groupId, description };
      } catch (error) {
        console.log(error);
      }
    }
  },
  deleteGroup: {
    key: 'DELETE_GROUP',
    /** 
     * @param {(string|number)} groupId
     * @returns {(string|number)}
     */
    action: async (groupId) => {
      try {
        if ((await authAxios.delete(`${baseGroupUrl}/${groupId}`)).status !== 200) {
          setTimeout(() => alert('was unable to delete group'), 100);
          return;
        }
        return groupId;
      } catch (error) {
        console.log(error);
      }
    }
  },
  joinGroup: {
    key: 'JOIN_GROUP',
    /** 
     * @param {(string|number)} groupId
     * @returns {(string|number)}
     */
    action: async (groupId) => {
      try {
        if ((await authAxios.post(`${baseMembershipUrl}/join/${groupId}`)).status !== 201) {
          setTimeout(() => alert('was unable to join group'), 100);
          return;
        }
        return groupId;
      } catch (error) {
        console.log(error);
      }
    }
  },
  removeUser: {
    key: 'REMOVE_USER',
    /** 
     * @param {{ groupId: (string|number), userId: (string|number) }} ids
     * @returns {(string|number)}
     */
    action: async ({ groupId, userId }) => {
      try {
        if ((await authAxios.delete(`${baseMembershipUrl}/remove/${groupId}/${userId}`)).status !== 200) {
          setTimeout(() => alert('was unable to remove user'), 100);
          return;
        }
        return userId;
      } catch (error) {
        console.log(error);
      }
    }
  },
  promoteUser: {
    key: 'PROMOTE_USER',
    /** 
     * @param {{ groupId: (string|number), userId: (string|number) }} ids
     * @returns {(string|number)}
     */
    action: async ({ groupId, userId }) => {
      try {
        if ((await authAxios.put(`${baseMembershipUrl}/promote/${groupId}/${userId}`, { role: 'admin' })).status !== 200) {
          setTimeout(() => alert('was unable to promote user'), 100);
          return;
        }
        return userId;
      } catch (error) {
        console.log(error);
      }
    }
  },
  demoteUser: {
    key: 'DEMOTE_USER',
    /** 
     * @param {{ groupId: (string|number), userId: (string|number) }} ids
     * @returns {(string|number)}
     */
    action: async ({ groupId, userId }) => {
      try {
        if ((await authAxios.put(`${baseMembershipUrl}/demote/${groupId}/${userId}`, { role: 'member' })).status !== 200) {
          setTimeout(() => alert('was unable to demote user'), 100);
          return;
        }
        return userId;
      } catch (error) {
        console.log(error);
      }
    }
  },
  transferOwnership: {
    key: 'TRANSFER_OWNERSHIP',
    /** 
     * @param {{ groupId: (string|number), userId: (string|number) }} ids
     * @returns {(string|number)}
     */
    action: async ({ groupId, userId }) => {
      try {
        if ((await authAxios.put(`${baseMembershipUrl}/transfer/${groupId}/${userId}`)).status !== 200) {
          setTimeout(() => alert('was unable to transfer ownership'), 100);
          return;
        }
        return userId;
      } catch (error) {
        console.log(error);
      }
    }
  }
}


export default groupActions;