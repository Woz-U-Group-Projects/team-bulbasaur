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

// export const addVote = async (type, current, postId) => {
//   if(type === 'likes'){
//     const posts = await axios.put(`http://localhost:3001/posts/api/${type}/${postId}`, { likes: current })
//     const posts_1 = await posts.data
    
//     const postList = posts_1.map( post => ({
//       id: post.PostId,
//       author: post.user.UserName,
//       title: post.PostHead,
//       body: post.PostBody,
//       likes: post.Likes,
//       dislikes: post.Dislikes
//     }))

//     return postList
//   }
//   if(type === 'dislikes'){
//     const posts = await axios.put(`http://localhost:3001/posts/api/${type}/${postId}`, { dislikes: current })
//     const posts_1 = await posts.data
   
//     const postList = posts_1.map( post => ({
//       id: post.PostId,
//       author: post.user.UserName,
//       title: post.PostHead,
//       body: post.PostBody,
//       likes: post.Likes,
//       dislikes: post.Dislikes
//     }))
    
//     return postList
//   }
// }

// export const addVoteCompleted = (posts) => {
//   return ({
//     type: 'ADD_VOTE_COMPLETED',
//     payload: posts
//   })
// }