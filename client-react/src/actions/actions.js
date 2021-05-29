export const getUsers = async () => {
  const user = await fetch('http://localhost:3001/users/api')
  const user_1 = await user.json()
  return user_1
}

export const getUsersCompleted = (users) => ({
  type: 'GET_USERS_COMPLETED',
  payload: users
})

