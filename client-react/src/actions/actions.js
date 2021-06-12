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
      authorId: post.UserId,
      author: post.user.UserName,
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
        authorId: post.UserId,
        author: post.user.UserName,
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
    author: post.user.UserName,
    authorId: post.UserId,
    title: post.PostHead,
    edit: post.Edit,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes,
    comments: post.comments.map(comment => ({
      id: comment.CommentId,
      body: comment.CommentBody,
      likes: comment.Likes,
      dislikes: comment.Dislikes,
      author: comment.user.UserName
    }))
  }))

  return posts
}
//========================================================================================

export const signup = async (object) => {
  const req = await axios.post('/users/api/signup', object)
  const data = await req.data
  return data
}

export const signupCompleted = (data) => ({
  type: 'SIGNUP_COMPLETED',
  payload: data
})
//========================================================================================

export const login = async (object) => {
  const req = await authAxios.post('/users/api/login', object)
  const res = await req.data
  if (res.result === false) {
    return res
  } else {
    const data = {
      result: res.result,
      message: res.message,
      user: mapUser(res.user)
    }
    return data
  }
}

export const loginCompleted = (data) => ({
  type: 'LOGIN_COMPLETED',
  payload: data
})
//========================================================================================

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
//========================================================================================

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
//========================================================================================

export const getProfileById = async (userId) => {
  const req = await authAxios.get(`/users/api/profile/${userId}`)
  const res = await req.data
  const profile = mapUser(res.data)
  return profile
}

export const getProfileByIdCompleted = (user) => {
  return ({
    type: 'GET_PROFILE_BY_ID_COMPLETED',
    payload: user
  })
}
//========================================================================================

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
//========================================================================================

export const getPostsByUserId = async (userId) => {
  const req = await axios.get(`/posts/api/${userId}`)
  const res = await req.data
  const posts = mapPosts(res)
  return posts.reverse()
}

export const getPostsByUserIdCompleted = (posts) => ({
  type: 'GET_POSTS_BY_USER_ID_COMPLETED',
  payload: posts
})
//========================================================================================

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
//========================================================================================

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
//========================================================================================

export const makeComment = async (obj) => {
  console.log(obj)
  const req = await authAxios.post('/comments/api', obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const makeCommentCompleted = (obj) => ({
  type: 'MAKE_COMMENT_COMPLETED',
  payload: obj
})
//========================================================================================

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
//========================================================================================

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
//========================================================================================

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