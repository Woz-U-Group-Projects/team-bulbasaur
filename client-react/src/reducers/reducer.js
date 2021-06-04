const initialState = {
  users: [],
  posts: [],
  userPosts: [],
  profile: {},
  user: undefined
}

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case 'GET_USERS_COMPLETED':
      return {
        ...state,
        users: action.payload
      }
    case 'GET_POSTS_COMPLETED':
      return {
        ...state,
        posts: action.payload
      }
    case 'ADD_VOTE_COMPLETED':
      return {
        ...state,
        posts: action.payload 
      }
    case 'GET_PROFILE_BY_ID_COMPLETED':
      return {
        ...state,
        profile: action.payload.data
      }
    case 'GET_POSTS_BY_USER_ID_COMPLETED':
      return {
        ...state,
        userPosts: action.payload
      }
    default: 
      return{
        ...state
      }
  }
}

export default reducer