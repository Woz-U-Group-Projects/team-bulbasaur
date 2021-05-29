const initialState = {
  users: []
}

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case 'GET_USERS_COMPLETED':
      return {
        ...state,
        users: action.payload
      }
    default: 
      return{
        ...state
      }
  }
}

export default reducer