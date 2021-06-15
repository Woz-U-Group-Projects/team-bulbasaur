/*
  table of contents
  basic actions: lines 119-164
  admin actions: lines 165-177
  all post actions: lines 178-292
  user post actions: lines 293-
*/

import axios from 'axios';

const cookie = document.cookie

const authAxios = axios.create({
  headers: {
    withCredentials: true,
    authorization: `Bearer ${cookie}`
  },
  credentials: 'same-origin'
})

const mapUser = (data) => {
  const user = {
    id: data.UserId,
    name: data.FullName,
    userName: data.UserName,
    email: data.Email,
    admin: data.Admin,
    posts: data.posts.map(post => ({
      id: post.PostId,
      author: {
        id: post.UserId,
        userName: post.user.UserName
      },
      title: post.PostHead,
      body: post.PostBody,
      edit: post.Edit,
      likes: post.Likes,
      dislikes: post.Dislikes,
      isHidden: post.Visible,
      comments: post.comments.map(comment => ({
        id: comment.CommentId,
        authorId: comment.UserId,
        author: comment.user.UserName,
        body: comment.CommentBody,
        likes: comment.Likes,
        dislikes: comment.Dislikes
      }))
    }))
  }

  return user
}

const mapUsers = (data) => {
  const users = data.map(user => {
    const posts = user.posts.map(post => {
      const comments = post.comments.map(comment => ({
        id: comment.CommentId,
        PostId: comment.PostId,
        authorId: comment.UserId,
        author: comment.user.UserName,
        body: comment.CommentBody,
        likes: comment.Likes,
        dislikes: comment.Dislikes
      }))

      return {
        id: post.PostId,
        author: {
          id: post.UserId,
          userName: post.user.UserName
        },
        title: post.PostHead,
        body: post.PostBody,
        edit: post.Edit,
        comments: comments,
        likes: post.Likes,
        dislikes: post.Dislikes,
        isHidden: post.Visible
      }
    })

    return {
      id: user.UserId,
      name: user.FullName,
      userName: user.UserName,
      email: user.Email,
      posts: posts,
      admin: user.Admin
    }
  })
  return users
}

const mapPosts = (data) => {
  const posts = data.map(post => ({
    id: post.PostId,
    author: {
      id: post.UserId,
      userName: post.user.UserName
    },
    title: post.PostHead,
    edit: post.Edit,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes,
    isHidden: post.Visible,
    comments: post.comments.map(comment => ({
      id: comment.CommentId,
      body: comment.CommentBody,
      likes: comment.Likes,
      dislikes: comment.Dislikes,
      author: comment.user.UserName,
      authorId: comment.UserId
    }))
  }))

  return posts
}
// basic actions for applications =====================================================================================

export const signup = async (object) => {
  const req = await axios.post('/users/api/signup', object)
  const data = await req.data
  return data
}

export const signupCompleted = (data) => ({
  type: 'SIGNUP_COMPLETED',
  payload: data
})
//=========================================================

export const login = async (object) => {
  const req = await authAxios.post('/users/api/login', object)
  const res = await req.data
  if (res.result === false) {
    return res
  } else {
    const data = {
      result: res.result,
      message: res.message,
      user: mapUser(res.user),
    }
    return data
  }
}

export const loginCompleted = (data) => ({
  type: 'LOGIN_COMPLETED',
  payload: data
})
//=========================================================

export const logout = async () => {
  const req = await axios.get('/users/api/logout')
  const data = await req.data
  console.log(data)
  return data
}

export const logoutCompleted = (data) => ({
  type: 'LOGOUT_COMPLETED',
  payload: data
})
// actions for admins to retrieve unfiltered data =====================================================================

export const getUsers = async () => {
  const req = await axios.get('/users/api')
  const res = await req.data
  const users = mapUsers(res)
  return users
}

export const getUsersCompleted = (users) => ({
  type: 'GET_USERS_COMPLETED',
  payload: users
})
// actions to edit posts/comments and returns all posts with comments =================================================

export const getPosts = async () => {
  const req = await axios.get('/posts/api')
  const res = await req.data
  const posts = mapPosts(res)
  return posts.reverse()
}

export const getPostsCompleted = (posts) => ({
  type: 'GET_POSTS_COMPLETED',
  payload: posts
})
//=========================================================

export const makePost = async (object) => {
  const req = await authAxios.post('/posts/api', object)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const makePostCompleted = (res) => ({
  type: 'MAKE_POST_COMPLETED',
  payload: res
})
//=========================================================

export const editPost = async (obj) => {
  const req = await authAxios.put(`/posts/api/edit`, obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return {
    status: res.status,
    message: res.message,
    data: posts.reverse()
  }
}

export const editPostCompleted = (data) => ({
  type: 'EDIT_POST_COMPLETED',
  payload: data
})
//=========================================================

export const updateVotes = async (type, current, postId) => {
  if (type === 'likes') {
    const req = await axios.put(`/posts/api/${type}/${postId}`, { likes: current })
    const res = await req.data
    const posts = mapPosts(res)
    return posts.reverse()
  }
  if (type === 'dislikes') {
    const req = await axios.put(`/posts/api/${type}/${postId}`, { dislikes: current })
    const res = await req.data
    const posts = mapPosts(res)
    return posts.reverse()
  }
}

export const updateVotesCompleted = (posts) => ({
  type: 'ADD_VOTE_COMPLETED',
  payload: posts
})
//=========================================================

export const deletePost = async (postId) => {
  const req = await authAxios.delete(`/posts/api/${postId}`)
  const res = await req.data
  const posts = mapPosts(res.data)
  return {
    status: res.status,
    message: res.message,
    data: posts.reverse()
  }
}

export const deletePostCompleted = (data) => ({
  type: 'DELETE_POST_COMPLETED',
  payload: data
})
//=========================================================

export const makeComment = async (obj) => {
  const req = await authAxios.post('/comments/api', obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const makeCommentCompleted = (obj) => ({
  type: 'MAKE_COMMENT_COMPLETED',
  payload: obj
})
//=========================================================

export const updateCommentVotes = async (type, current, commentId) => {
  if (type === 'likes') {
    const req = await axios.put(`/comments/api/${type}/${commentId}`, { likes: current })
    const res = await req.data
    const posts = mapPosts(res.data)
    return posts.reverse()
  }
  if (type === 'dislikes') {
    const req = await axios.put(`/comments/api/${type}/${commentId}`, { dislikes: current })
    const res = await req.data
    const posts = mapPosts(res.data)
    return posts.reverse()
  }
}

export const updateCommentVotesCompleted = (data) => ({
  type: 'COMMENT_VOTES_COMPLETED',
  payload: data
})
//=========================================================

export const deleteComment = async (obj) => {
  let { commentId } = obj
  const req = await authAxios.delete(`/comments/api/${commentId}`)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const deleteCommentCompleted = (data) => ({
  type: 'DELETE_COMMENT_COMPLETED',
  payload: data
})
// actions to edit posts/comments and returns posts with comments for a single user ===================================

const getProfileById = async (userId) => {
  const req = await authAxios.get(`/users/api/profile/${userId}`)
  const res = await req.data
  const profile = mapUser(res.data)
  return profile
}

const getPostsByUserId = async (userId) => {
  const req = await axios.get(`/posts/api/${userId}`)
  const res = await req.data
  const posts = mapPosts(res)
  return posts.reverse()
}

export const getProfile = async (userId) => {
  const profile = await getProfileById(userId)
  const profilePosts = await getPostsByUserId(userId)

  const data = {
    profile: profile,
    posts: profilePosts
  }

  return data
}

export const getProfileCompleted = (data) => ({
  type: 'GET_PROFILE_COMPLETED',
  payload: data
})
//=========================================================

export const makePostByUserId = async (obj) => {
  const req = await authAxios.post(`/posts/api/${obj.userId}`, obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const makePostByUserIdCompleted = (data) => ({
  type: 'MAKE_POST_BY_USER_ID_COMPLETED',
  payload: data
})
//=========================================================

export const editPostByUserId = async (obj) => {
  const req = await authAxios.put(`/posts/api/${obj.userId}`, obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const editPostByUserIdCompleted = (data) => ({
  type: 'EDIT_POST_BY_USER_ID_COMPLETED',
  payload: data
})
//=========================================================

export const updateVotesByUserId = async (type, current, userId, postId) => {
  if (type === 'likes') {
    const req = await axios.put('/posts/api/user/profile/votes', {
      type: type,
      postId: postId,
      userId: userId,
      likes: current
    })
    const res = await req.data
    const posts = mapPosts(res)
    return posts.reverse()
  }
  if (type === 'dislikes') {
    const req = await axios.put('/posts/api/user/profile/votes', {
      type: type,
      postId: postId,
      userId: userId,
      dislikes: current
    })
    const res = await req.data
    const posts = mapPosts(res)
    return posts.reverse()
  }
}

export const updateVotesByUserIdCompleted = (data) => ({
  type: 'UPDATE_VOTES_BY_USER_ID_COMPLETED',
  payload: data
})
//=========================================================

export const deletePostByUserId = async (postId, userId) => {
  const req = await authAxios.delete(`/posts/api/${postId}/${userId}`)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const deletePostByUserIdCompleted = (data) => ({
  type: 'DELETE_POST_BY_USER_ID_COMPLETED',
  payload: data
})
//=========================================================

export const makeCommentByUserId = async (obj) => {
  const req = await authAxios.post(`/comments/api/${obj.profileId}`, obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const makeCommentByUserIdComplete = (data) => ({
  type: 'MAKE_COMMENT_BY_USER_ID_COMPLETED',
  payload: data
})
//=========================================================

export const updateCommentVotesByUserId = async (obj) => {
  let {type, userId, current, commentId} = obj
  if (type === 'likes') {
    const req = await axios.put(`/comments/api/update/votes/${commentId}`, {
      type: type,
      userId: userId,
      likes: current
    })
    const res = await req.data
    const posts = mapPosts(res.data)
    return posts.reverse()
  }
  if (type === 'dislikes') {
    const req = await axios.put(`/comments/api/update/votes/${commentId}`, {
      type: type,
      userId: userId,
      dislikes: current
    })
    const res = await req.data
    const posts = mapPosts(res.data)
    return posts.reverse()
  }
}

export const updateCommentVotesByUserIdCompleted = (data) => ({
  type: 'UPDATE_COMMENT_VOTES_BY_USER_ID_COMPLETED',
  payload: data
})

export const deleteCommentByUserId = async (obj) => {
  let { commentId, userId } = obj
  const req = await authAxios.delete(`/comments/api/${commentId}/${userId}`)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const deleteCommentByUserIdCompleted = (data) => ({
  type: 'DELETE_COMMENT_BY_USER_ID_COMPLETED',
  payload: data
})