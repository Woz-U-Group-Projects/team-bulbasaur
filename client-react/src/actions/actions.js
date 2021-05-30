import axios from 'axios'

export const getUsers = async () => {
  const user = await axios.get('http://localhost:3001/users/api')
  const user_1 = await user.data
  return user_1
}

export const getUsersCompleted = (users) => ({
  type: 'GET_USERS_COMPLETED',
  payload: users
})

export const getPosts = async () => {
  const posts = await axios.get('http://localhost:3001/posts/api')
  const posts_1 = await posts.data
  console.log(posts_1)
  
  const postList = posts_1.map( post => ({
    id: post.PostId,
    author: post.user.UserName,
    title: post.PostHead,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes
  }))
  return postList
}

export const getPostsCompleted = (posts) => ({
  type: 'GET_POSTS_COMPLETED',
  payload: posts
})

export const addVote = async (type, current, postId) => {
  if(type === 'likes'){
    const post = await axios.put(`http://localhost:3001/posts/api/${type}/${postId}`, { likes: current })
    const post_1 = await post.data
    console.log(post_1)
    return post_1
  }
  if(type === 'dislikes'){
    const post = await axios.put(`http://localhost:3001/posts/api/${type}/${postId}`, { dislikes: current })
    const post_1 = await post.data
    console.log(post_1)
    return post_1
  }
}

export const addVoteCompleted = (post) => ({
  type: 'ADD_VOTE_COMPLETED'
})