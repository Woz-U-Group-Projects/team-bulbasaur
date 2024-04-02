/**
 * @typedef {Object} State
 * @property {import("../../../server-express-mysql/controllers/UserContoller").user[]} users
 * @property {import("../../../server-express-mysql/controllers/PostController").post[]} posts
 * @property {import("../../../server-express-mysql/controllers/GroupController").group[]} groups
 * @property {import("../../../server-express-mysql/controllers/PostController").post[]} userPosts
 * @property {any} profile
 * @property {Object} signupStatus
 * @property {import("../../../server-express-mysql/controllers/UserContoller").user} loggedInUser  
 * @property {boolean} isLoggedIn
 * @property {import("../../../server-express-mysql/controllers/GroupController").group} selectedGroup
 * @property {import("../../../server-express-mysql/controllers/PostController").post[]} groupPosts
 */
const initialState = {
  users: [],
  posts: [],
  groups: [],
  profile: undefined,
  signupStatus: {},
  loggedInUser: undefined,
  isLoggedIn: false,
  selectedGroup: undefined,
}

const reducer = (state = initialState, action) => {
  // if (action.payload === undefined) return { ...state }
  switch (action.type) {
    // utility actions
    case 'LOGIN': return {
      ...state,
      isLoggedIn: action.payload ? true : false,
      loggedInUser: action.payload
    }
    case 'LOGOUT': return {
      ...state,
      isLoggedIn: false,
      loggedInUser: undefined,
    }

    // user actions
    case 'GET_USERS': return {
      ...state,
      users: action.payload ?? []
    }
    case 'GET_USER': return {
      ...state,
      profile: action.payload
    }
    case 'ADD_FRIEND': return {
      ...state,
      loggedInUser: {
        ...state.loggedInUser,
        outgoing: [state.users.find(user => user.userId === action.payload), ...state.loggedInUser.outgoing]
      }
    }
    case 'ACCEPT_REQUEST': {
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          incoming: state.loggedInUser.incoming.filter(user => user.userId !== action.payload),
          friends: [state.loggedInUser.incoming.find(user => user.userId === action.payload), ...state.loggedInUser.friends]
        }
      }
    }
    case 'REJECT_REQUEST': return {
      ...state,
      loggedInUser: {
        ...state.loggedInUser,
        incoming: state.loggedInUser.incoming.filter(user => user.userId !== action.payload),
      }
    }
    case 'DELETE_FRIEND': return {
      ...state,
      loggedInUser: {
        ...state.loggedInUser,
        friends: state.loggedInUser.friends.filter(user => user.userId !== action.payload),
        incoming: state.loggedInUser.incoming.filter(user => user.userId !== action.payload),
        outgoing: state.loggedInUser.outgoing.filter(user => user.userId !== action.payload),
      }
    }
    case 'TRANSFER_OWNERSHIP': return {
      ...state,
      selectedGroup: {
        ...state.selectedGroup,
        owner: state.selectedGroup.admins.find(user => user.userId === action.payload),
        admins: [state.selectedGroup.owner, ...state.selectedGroup.admins.filter(user => user.userId !== action.payload)]
      }
    }
    case 'CLEAN_UP_PROFILE': return {
      ...state,
      profile: undefined
    }

    // group actions
    case 'CREATE_GROUP': return {
      ...state,
      groups: [...state.groups, action.payload]
    }
    case 'GET_GROUPS': return {
      ...state,
      groups: action.payload ?? []
    }
    case 'GET_GROUP': return {
      ...state,
      selectedGroup: action.payload
    }
    case 'EDIT_GROUP': return {
      ...state,
      selectedGroup: {
        ...state.selectedGroup,
        description: action.payload.description,
      }
    }
    case 'DELETE_GROUP': return {
      ...state,
      groups: state.groups.filter(group => group.groupId !== action.payload),
      selectedGroup: undefined
    }
    case 'JOIN_GROUP': return {
      ...state,
      groups: state.groups.map(group => group.groupId === action.payload ? {
        ...group,
        members: [...group.members, state.loggedInUser]
      } : group),
      selectedGroup: state.selectedGroup ? {
        ...state.selectedGroup,
        members: [...state.selectedGroup.members, state.loggedInUser]
      } : undefined
    }
    case 'REMOVE_USER': return {
      ...state,
      selectedGroup: {
        ...state.selectedGroup,
        members: state.selectedGroup.members.filter(user => user.userId !== action.payload),
        admins: state.selectedGroup.admins.filter(user => user.userId !== action.payload)
      }
    }
    case 'PROMOTE_USER': return {
      ...state,
      selectedGroup: {
        ...state.selectedGroup,
        admins: [...state.selectedGroup.admins, state.selectedGroup.members.find(user => user.userId === action.payload)],
        members: state.selectedGroup.members.filter(user => user.userId !== action.payload)
      }
    }
    case 'DEMOTE_USER': return {
      ...state,
      selectedGroup: {
        ...state.selectedGroup,
        admins: state.selectedGroup.admins.filter(user => user.userId !== action.payload),
        members: [...state.selectedGroup.members, state.selectedGroup.admins.find(user => user.userId === action.payload)]
      }
    }
    case 'CLEAN_UP_GROUP': return {
      ...state,
      selectedGroup: undefined
    }

    // post actions
    case 'GET_POSTS': return {
      ...state,
      posts: action.payload ? action.payload.reverse() : []
    }
    case 'CREATE_POST': return {
      ...state,
      posts: [action.payload, ...state.posts],
      loggedInUser: {
        ...state.loggedInUser,
        posts: [action.payload, ...state.loggedInUser.posts]
      },
      selectedGroup: state.selectedGroup && action.payload.groupId !== undefined ? {
        ...state.selectedGroup,
        posts: [action.payload, ...state.selectedGroup.posts]
      } : state.selectedGroup
    }
    case 'EDIT_POST': return {
      ...state,
      posts: state.posts.map(post => post.postId === action.payload.postId ? action.payload : post)
    }
    case 'DELETE_POST': return {
      ...state,
      posts: state.posts.filter(post => post.postId !== action.payload)
    }
    case 'CREATE_COMMENT': return {
      ...state,
      posts: state.posts.map(post => post.postId === action.payload.postId ?
        { ...post, comments: [action.payload, ...post.comments] }
        : post
      ),
      selectedGroup: (
        state.selectedGroup &&
        state.selectedGroup.posts.find(post => post.postId === action.payload.postId).groupId !== undefined
      ) ? {
        ...state.selectedGroup,
        posts: state.selectedGroup.posts.map(post => post.postId === action.payload.postId ? {
          ...post,
          comments: [action.payload, ...post.comments]
        } : post)
      } : state.selectedGroup
    }
    case 'DELETE_COMMENT': {
      return {
        ...state,
        posts: state.posts.map(post => post.postId === action.payload.postId ?
          { ...post, comments: post.comments.filter(comment => comment.commentId !== action.payload.commentId) }
          : post
        )
      }
    }


    default: return { ...state }
  }
}

export default reducer