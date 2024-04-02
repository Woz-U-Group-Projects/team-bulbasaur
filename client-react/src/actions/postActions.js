import authAxios from "./authAxios";

const basePostUrl = "/api/posts",
  baseCommentUrl = `${basePostUrl}/comments`;

/**
 * @typedef {Object} actionObj
 * @property {string} key
 * @property {function} action
 *
 * @typedef {Object.<string, actionObj>} postActions
 *
 * @type {postActions}
 */
const postActions = {
  getPosts: {
    key: 'GET_POSTS',
    /** @returns {Promise<import("../../../server-express-mysql/controllers/PostController").post[]>} */
    action: async () => {
      try {
        const req = await authAxios.get(`${basePostUrl}`);
        const res = await req.data;
        return res.posts;
      } catch (error) {
        console.log(error);
      }
    }
  },
  createPost: {
    key: 'CREATE_POST',
    action: async (postData) => {
      try {
        const req = await authAxios.post(`${basePostUrl}`, { ...postData });
        const res = await req.data;
        return res.post;
      } catch (error) {
        console.log(error);
      }
    }
  },
  editPost: {
    key: 'EDIT_POST',
    action: async (post) => {
      try {
        const req = await authAxios.put(`${basePostUrl}/${post.postId}`, post);
        const res = await req.data;
        return res.post;
      } catch (error) {
        console.log(error);
      }
    }
  },
  deletePost: {
    key: 'DELETE_POST',
    action: async (postId) => {
      if ((await authAxios.delete(`${basePostUrl}/${postId}`)).status !== 200) {
        setTimeout(() => { alert('Delete Failed') }, 100);
        return;
      }
      return postId;
    }
  },
  createComment: {
    key: 'CREATE_COMMENT',
    action: async (comment) => {
      try {
        const req = await authAxios.post(`${baseCommentUrl}`, comment);
        const res = await req.data;
        return res.comment;
      } catch (error) {
        console.log(error)
      }
    }
  },
  deleteComment: {
    key: 'DELETE_COMMENT',
    action: async ({ commentId, postId }) => {
      if ((await authAxios.delete(`${baseCommentUrl}/${commentId}`)).status !== 200) {
        setTimeout(() => { alert('Delete Failed') }, 100);
        return;
      }
      return { commentId, postId };
    }
  }
}

export default postActions;