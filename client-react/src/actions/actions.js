import axios from 'axios'

export const getUsers = async () => {
  const req = await axios.get('http://localhost:3001/users/api')
  const data = await req.data

  const users = data.map( user => ({
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

export const getPosts = async () => {
  const req = await axios.get('http://localhost:3001/posts/api')
  const data = await req.data
  
  const posts = data.map( post => ({
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

export const updateVotes = async (type, current, postId) => {
  if(type === 'likes'){
    const req = await axios.put(`http://localhost:3001/posts/api/${type}/${postId}`, { likes: current })
    const data = await req.data
    
    const posts = data.map( post => ({
      id: post.PostId,
      author: post.user.UserName,
      title: post.PostHead,
      body: post.PostBody,
      likes: post.Likes,
      dislikes: post.Dislikes
    }))

    return posts
  }
  if(type === 'dislikes'){
    const req = await axios.put(`http://localhost:3001/posts/api/${type}/${postId}`, { dislikes: current })
    const data = await req.data
   
    const posts = data.map( post => ({
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