export const getUsers = async () => {
  const user = await fetch('http://localhost:3001/users/api')
  const user_1 = await user.json()
  return user_1
}

export const getUsersCompleted = (users) => ({
  type: 'GET_USERS_COMPLETED',
  payload: users
})

export const getPosts = async () => {
  const posts = await fetch('http://localhost:3001:/posts/api')
  const posts_1 = await posts.json()
  console.log(posts_1)
  return posts_1
}

export const getPostsCompleted = (posts) => ({
  type: 'GET_POSTS_COMPLETED',
  payload: posts
})