import axios from 'axios'

const cookie = document.cookie

const authAxios = axios.create({
  headers: {
    authorization: `Bearer ${cookie}`
  }
})

export const login = async (object) => {
  const req = await axios.post('http://localhost:3001/users/api/login', object)
  const data = await req.data

  const loggedInUser = {
    id: data.UserId,
    name: data.UserName,
    email: data.Email,
    userName: data.UserName
  }

  console.log(loggedInUser)

  return loggedInUser
}

export const loginCompleted = (data) => ({
  type: 'LOGIN_COMPLETED',
  payload: data
})

export const getUsers = async () => {
  const req = await axios.get('http://localhost:3001/users/api')
  const data = await req.data

  const users = data.map(user => ({
    id: user.UserId,
    name: user.FullName,
    userName: user.UserName,
    email: user.Email
  }))
  return users
}

export const getUsersCompleted = (users) => ({
  type: 'GET_USERS_COMPLETED',
  payload: users
})

export const getProfileById = async (userId) => {
  const req = await authAxios.get(`http://localhost:3001/users/api/profile/${userId}`)
  const data = await req.data
  
  const profile = {
    status: data.result,
    data: {
      id: data.data.UserId,
      name: data.data.FullName,
      userName: data.data.UserName
    }
  }
  return profile
}

export const getProfileByIdCompleted = (user) => {
  return({
    type: 'GET_PROFILE_BY_ID_COMPLETED', 
    payload: user
  })
}

export const getPosts = async () => {
  const req = await axios.get('http://localhost:3001/posts/api')
  const data = await req.data

  const posts = data.map(post => ({
    id: post.PostId,
    author: post.user.UserName,
    title: post.PostHead,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes
  }))
  return posts
}

export const getPostsCompleted = (posts) => ({
  type: 'GET_POSTS_COMPLETED',
  payload: posts
})

export const getPostsByUserId = async (userId) => {
  const req = await axios.get(`http://localhost:3001/posts/api/${userId}`)
  const data = await req.data
  
  const posts = data.map(post => ({
    id: post.PostId,
    author: post.user.UserName,
    title: post.PostHead,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes
  }))
  return posts
}

export const getPostsByUserIdCompleted = (posts) => ({
  type: 'GET_POSTS_BY_USER_ID_COMPLETED',
  payload: posts
})

export const updateVotes = async (type, current, postId) => {
  if (type === 'likes') {
    const req = await axios.put(`http://localhost:3001/posts/api/${type}/${postId}`, { likes: current })
    const data = await req.data

    const posts = data.map(post => ({
      id: post.PostId,
      author: post.user.UserName,
      title: post.PostHead,
      body: post.PostBody,
      likes: post.Likes,
      dislikes: post.Dislikes
    }))

    return posts
  }
  if (type === 'dislikes') {
    const req = await axios.put(`http://localhost:3001/posts/api/${type}/${postId}`, { dislikes: current })
    const data = await req.data

    const posts = data.map(post => ({
      id: post.PostId,
      author: post.user.UserName,
      title: post.PostHead,
      body: post.PostBody,
      likes: post.Likes,
      dislikes: post.Dislikes
    }))

    return posts
  }
}

export const updateVotesCompleted = (posts) => ({
  type: 'ADD_VOTE_COMPLETED',
  payload: posts
})