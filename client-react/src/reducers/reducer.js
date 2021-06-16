const initialState = {
  users: [],
  posts: [],
  groups: [],
  userPosts: [],
  profile: {},
  signupStatus: {},
  loggedInUser: undefined,
  profilePosts: [],
  isLoggedIn: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case 'GET_PROFILE_COMPLETED':
      return {
        ...state,
        profile: action.payload.profile,
        profilePosts: action.payload.posts
      }
    case 'SIGNUP_COMPLETED':
      return {
        ...state,
        signupStatus: action.payload
      }
    case 'LOGIN_COMPLETED':
      if (action.payload.result === true) {
        setTimeout(() => {
          alert(action.payload.message)
        }, 100);
        return {
          ...state,
          isLoggedIn: action.payload.result,
          loggedInUser: action.payload.user,
        }
      } else {
        setTimeout(() => {
          alert(action.payload.message)
        }, 100);
        return {
          ...state
        }
      }
    case 'LOGOUT_COMPLETED':
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: undefined
      }
    case 'MAKE_POST_COMPLETED':
      return {
        ...state,
        posts: action.payload
      }
    case 'DELETE_POST_COMPLETED':
      setTimeout(() => {
        alert(action.payload.message)
      }, 100);
      return {
        ...state,
        posts: action.payload.data
      }
    case 'EDIT_POST_COMPLETED':
      setTimeout(() => {
        alert(action.payload.message)
      }, 100);
      return {
        ...state,
        posts: action.payload.data
      }
    case 'MAKE_COMMENT_COMPLETED':
      return {
        ...state,
        posts: action.payload
      }
    case 'COMMENT_VOTES_COMPLETED':
      return {
        ...state,
        posts: action.payload
      }
    case 'DELETE_COMMENT_COMPLETED':
      return {
        ...state,
        posts: action.payload
      }
    case 'UPDATE_VOTES_BY_USER_ID_COMPLETED':
      return {
        ...state,
        profilePosts: action.payload
      }
    case 'MAKE_POST_BY_USER_ID_COMPLETED':
      return {
        ...state,
        profilePosts: action.payload
      }
    case 'EDIT_POST_BY_USER_ID_COMPLETED':
      return {
        ...state,
        profilePosts: action.payload
      }
    case 'DELETE_POST_BY_USER_ID_COMPLETED':
      return {
        ...state,
        profilePosts: action.payload
      }
    case 'MAKE_COMMENT_BY_USER_ID_COMPLETED': 
      return {
        ...state,
        profilePosts: action.payload
      }
    case 'UPDATE_COMMENT_VOTES_BY_USER_ID_COMPLETED':
      return {
        ...state,
        profilePosts: action.payload
      }
    case 'DELETE_COMMENT_BY_USER_ID_COMPLETED':
      return {
        ...state,
        profilePosts: action.payload
      }
    case 'GET_ALL_GROUPS_COMPLETED':
      return {
        ...state,
        groups: action.payload
      }
    case 'JOIN_GROUP_COMPLETED':
      return {
        ...state,
        groups: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer