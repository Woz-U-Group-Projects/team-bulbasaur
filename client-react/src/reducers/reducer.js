const initialState = {
  users: [],
  posts: []
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
    default: 
      return{
        ...state
      }
  }
}

export default reducer