import axios from 'axios';

const cookie = document.cookie

const authAxios = axios.create({
  headers: {
    withCredentials: true,
    authorization: `Bearer ${cookie}`
  },
  credentials: 'same-origin'
})

const mapFriends = (data) => {

  const friends = data.map(user => {

    return {
      id: user.UserId,
      name: user.FullName,
      userName: user.UserName,
      email: user.Email,
      admin: user.Admin,
      relationShip: {
        senderId: user.friends.UserId1,
        recieverId: user.friends.UserId2,
        status: user.friends.Status,
        active: user.friends.Active
      },
    }
  })

  return friends
}

const mapRequests = (data) => {
  const requests = data.map(user => {

    return {
      id: user.UserId,
      name: user.FullName,
      userName: user.UserName,
      email: user.Email,
      admin: user.Admin,
      relationShip: {
        senderId: user.friends.UserId1,
        recieverId: user.friends.UserId2,
        status: user.friends.Status,
        active: user.friends.Active
      },
    }
  })

  return requests
}

const mapUser = (data) => {
  const user = {
    id: data.UserId,
    name: data.FullName,
    userName: data.UserName,
    email: data.Email,
    admin: data.Admin,
    friends: mapFriends(data.Friends),
    requests: mapRequests(data.Requests),
    groups: data.groups.map(group => ({
      groupId: group.GroupId,
      groupName: group.GroupName,
      discription: group.Discription,
      likes: group.Likes,
      dislikes: group.Dislikes,
      private: group.IsPrivate
    })),
    posts: data.posts.map(post => ({
      id: post.PostId,
      author: {
        id: post.UserId,
        userName: post.user.UserName
      },
      title: post.PostHead,
      body: post.PostBody,
      edit: post.Edit,
      likes: post.Likes,
      dislikes: post.Dislikes,
      isHidden: post.Visible,
      comments: post.comments.map(comment => ({
        id: comment.CommentId,
        authorId: comment.UserId,
        author: comment.user.UserName,
        body: comment.CommentBody,
        likes: comment.Likes,
        dislikes: comment.Dislikes
      }))
    }))
  }

  return user
}

const mapUsers = (data) => {
  const users = data.map(user => {
    const posts = user.posts.map(post => {
      const comments = post.comments.map(comment => ({
        id: comment.CommentId,
        PostId: comment.PostId,
        authorId: comment.UserId,
        author: comment.user.UserName,
        body: comment.CommentBody,
        likes: comment.Likes,
        dislikes: comment.Dislikes
      }))

      return {
        id: post.PostId,
        author: {
          id: post.UserId,
          userName: post.user.UserName
        },
        title: post.PostHead,
        body: post.PostBody,
        edit: post.Edit,
        comments: comments,
        likes: post.Likes,
        dislikes: post.Dislikes,
        isHidden: post.Visible
      }
    })

    return {
      id: user.UserId,
      name: user.FullName,
      userName: user.UserName,
      email: user.Email,
      posts: posts,
      admin: user.Admin
    }
  })
  return users
}

const mapGroupUsers = (data) => {
  const users = data.map(user => ({
    id: user.UserId,
    userName: user.UserName,
    membership: user.grouped_users.MemberShip
  }))

  return users
}

const mapPosts = (data) => {
  const posts = data.map(post => ({
    id: post.PostId,
    author: {
      id: post.UserId,
      userName: post.user.UserName
    },
    title: post.PostHead,
    edit: post.Edit,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes,
    isHidden: post.Visible,
    comments: post.comments.map(comment => ({
      id: comment.CommentId,
      body: comment.CommentBody,
      likes: comment.Likes,
      dislikes: comment.Dislikes,
      author: comment.user.UserName,
      authorId: comment.UserId
    }))
  }))

  return posts
}

const mapGroups = (data) => {
  const groups = data.map(group => {
    const users = mapGroupUsers(group.users)
    const posts = mapPosts(group.posts)

    return {
      groupId: group.GroupId,
      groupName: group.GroupName,
      discription: group.Discription,
      likes: group.Likes,
      dislikes: group.Dislikes,
      private: group.IsPrivate,
      users: users,
      posts: posts.reverse()
    }
  })
  return groups
}

const mapGroup = data => {
  const users = mapGroupUsers(data.users)
  const group = {
    groupId: data.GroupId,
    groupName: data.GroupName,
    discription: data.Discription,
    likes: data.Likes,
    dislikes: data.Dislikes,
    private: data.IsPrivate,
    users: users,
  }
  return group
}

// basic actions for applications =====================================================================================

export const sendToken = async () => {
  try {
    const req = await authAxios.get('/users/api/login')
    const res = await req.data
    console.log(res)
    if (res.status) {
      const user = mapUser(res.data)
      return { status: res.status, data: user }
    } else {
      return res
    }
  } catch (error) {
    console.log(error)
  }
}

export const sendTokenCompleted = data => ({
  type: 'SEND_TOKEN_COMPLETED',
  payload: data
})

export const signup = async (object) => {
  const req = await axios.post('/users/api/signup', object)
  const data = await req.data
  return data
}

export const signupCompleted = (data) => ({
  type: 'SIGNUP_COMPLETED',
  payload: data
})
//=========================================================

export const login = async (object) => {
  const req = await authAxios.post('/users/api/login', object)
  const res = await req.data
  if (res.result === false) {
    return res
  } else {
    const data = {
      result: res.result,
      message: res.message,
      user: mapUser(res.user),
    }
    return data
  }
}

export const loginCompleted = (data) => ({
  type: 'LOGIN_COMPLETED',
  payload: data
})
//=========================================================

export const logout = async () => {
  const req = await axios.get('/users/api/logout')
  const data = await req.data
  return data
}

export const logoutCompleted = (data) => ({
  type: 'LOGOUT_COMPLETED',
  payload: data
})
// actions for admins to retrieve unfiltered data =====================================================================

export const getUsers = async () => {
  const req = await axios.get('/users/api')
  const res = await req.data
  const users = mapUsers(res)
  return users
}

export const getUsersCompleted = (users) => ({
  type: 'GET_USERS_COMPLETED',
  payload: users
})
// actions to edit posts/comments and returns all posts with comments =================================================

export const getPosts = async () => {
  const req = await axios.get('/posts/api')
  const res = await req.data
  const posts = mapPosts(res)
  return posts.reverse()
}

export const getPostsCompleted = (posts) => ({
  type: 'GET_POSTS_COMPLETED',
  payload: posts
})
//=========================================================

export const makePost = async (object) => {
  const req = await authAxios.post('/posts/api', object)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const makePostCompleted = (res) => ({
  type: 'MAKE_POST_COMPLETED',
  payload: res
})
//=========================================================

export const editPost = async (obj) => {
  const req = await authAxios.put(`/posts/api/edit`, obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return {
    status: res.status,
    message: res.message,
    data: posts.reverse()
  }
}

export const editPostCompleted = (data) => ({
  type: 'EDIT_POST_COMPLETED',
  payload: data
})
//=========================================================

export const updateVotes = async (type, current, postId) => {
  if (type === 'likes') {
    const req = await axios.put(`/posts/api/${type}/${postId}`, { likes: current })
    const res = await req.data
    const posts = mapPosts(res)
    return posts.reverse()
  }
  if (type === 'dislikes') {
    const req = await axios.put(`/posts/api/${type}/${postId}`, { dislikes: current })
    const res = await req.data
    const posts = mapPosts(res)
    return posts.reverse()
  }
}

export const updateVotesCompleted = (posts) => ({
  type: 'ADD_VOTE_COMPLETED',
  payload: posts
})
//=========================================================

export const deletePost = async (postId) => {
  const req = await authAxios.delete(`/posts/api/${postId}`)
  const res = await req.data
  const posts = mapPosts(res.data)
  return {
    status: res.status,
    message: res.message,
    data: posts.reverse()
  }
}

export const deletePostCompleted = (data) => ({
  type: 'DELETE_POST_COMPLETED',
  payload: data
})
//=========================================================

export const makeComment = async (obj) => {
  const req = await authAxios.post('/comments/api', obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const makeCommentCompleted = (obj) => ({
  type: 'MAKE_COMMENT_COMPLETED',
  payload: obj
})
//=========================================================

export const updateCommentVotes = async (type, current, commentId) => {
  if (type === 'likes') {
    const req = await axios.put(`/comments/api/${type}/${commentId}`, { likes: current })
    const res = await req.data
    const posts = mapPosts(res.data)
    return posts.reverse()
  }
  if (type === 'dislikes') {
    const req = await axios.put(`/comments/api/${type}/${commentId}`, { dislikes: current })
    const res = await req.data
    const posts = mapPosts(res.data)
    return posts.reverse()
  }
}

export const updateCommentVotesCompleted = (data) => ({
  type: 'COMMENT_VOTES_COMPLETED',
  payload: data
})
//=========================================================

export const deleteComment = async (obj) => {
  let { commentId } = obj
  const req = await authAxios.delete(`/comments/api/${commentId}`)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const deleteCommentCompleted = (data) => ({
  type: 'DELETE_COMMENT_COMPLETED',
  payload: data
})
// actions to edit posts/comments and returns posts with comments for a single user ===================================

const getProfileById = async (userId) => {
  const req = await authAxios.get(`/users/api/profile/${userId}`)
  const res = await req.data
  console.log(res)
  const profile = mapUser(res.data)
  return profile
}

const getPostsByUserId = async (userId) => {
  const req = await axios.get(`/posts/api/${userId}`)
  const res = await req.data
  const posts = mapPosts(res)
  return posts.reverse()
}

export const getProfile = async (userId) => {
  const profile = await getProfileById(userId)
  const profilePosts = await getPostsByUserId(userId)

  const data = {
    profile: profile,
    posts: profilePosts
  }

  return data
}

export const getProfileCompleted = (data) => ({
  type: 'GET_PROFILE_COMPLETED',
  payload: data
})
//=========================================================

export const cleanUpProfile = () => ({
  type: 'CLEAN_UP_PROFILE'
})
//=========================================================

export const makePostByUserId = async (obj) => {
  const req = await authAxios.post(`/posts/api/${obj.userId}`, obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const makePostByUserIdCompleted = (data) => ({
  type: 'MAKE_POST_BY_USER_ID_COMPLETED',
  payload: data
})
//=========================================================

export const editPostByUserId = async (obj) => {
  const req = await authAxios.put(`/posts/api/${obj.userId}`, obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const editPostByUserIdCompleted = (data) => ({
  type: 'EDIT_POST_BY_USER_ID_COMPLETED',
  payload: data
})
//=========================================================

export const updateVotesByUserId = async (type, current, userId, postId) => {
  if (type === 'likes') {
    const req = await axios.put('/posts/api/user/profile/votes', {
      type: type,
      postId: postId,
      userId: userId,
      likes: current
    })
    const res = await req.data
    const posts = mapPosts(res)
    return posts.reverse()
  }
  if (type === 'dislikes') {
    const req = await axios.put('/posts/api/user/profile/votes', {
      type: type,
      postId: postId,
      userId: userId,
      dislikes: current
    })
    const res = await req.data
    const posts = mapPosts(res)
    return posts.reverse()
  }
}

export const updateVotesByUserIdCompleted = (data) => ({
  type: 'UPDATE_VOTES_BY_USER_ID_COMPLETED',
  payload: data
})
//=========================================================

export const deletePostByUserId = async (postId, userId) => {
  const req = await authAxios.delete(`/posts/api/${postId}/${userId}`)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const deletePostByUserIdCompleted = (data) => ({
  type: 'DELETE_POST_BY_USER_ID_COMPLETED',
  payload: data
})
//=========================================================

export const makeCommentByUserId = async (obj) => {
  const req = await authAxios.post(`/comments/api/${obj.profileId}`, obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const makeCommentByUserIdComplete = (data) => ({
  type: 'MAKE_COMMENT_BY_USER_ID_COMPLETED',
  payload: data
})
//=========================================================

export const updateCommentVotesByUserId = async (obj) => {
  let { type, userId, current, commentId } = obj
  if (type === 'likes') {
    const req = await axios.put(`/comments/api/update/votes/${commentId}`, {
      type: type,
      userId: userId,
      likes: current
    })
    const res = await req.data
    const posts = mapPosts(res.data)
    return posts.reverse()
  }
  if (type === 'dislikes') {
    const req = await axios.put(`/comments/api/update/votes/${commentId}`, {
      type: type,
      userId: userId,
      dislikes: current
    })
    const res = await req.data
    const posts = mapPosts(res.data)
    return posts.reverse()
  }
}

export const updateCommentVotesByUserIdCompleted = (data) => ({
  type: 'UPDATE_COMMENT_VOTES_BY_USER_ID_COMPLETED',
  payload: data
})

export const deleteCommentByUserId = async (obj) => {
  let { commentId, userId } = obj
  const req = await authAxios.delete(`/comments/api/${commentId}/${userId}`)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const deleteCommentByUserIdCompleted = (data) => ({
  type: 'DELETE_COMMENT_BY_USER_ID_COMPLETED',
  payload: data
})
// actions for retrieving/editing all groups ==========================================================================

export const getAllGroups = async () => {
  const req = await authAxios.get('/groups/api/groups')
  const res = await req.data
  const groups = mapGroups(res)
  return groups
}

export const getAllGroupsCompleted = (data) => ({
  type: 'GET_ALL_GROUPS_COMPLETED',
  payload: data
})
//=========================================================

export const createGroup = async (obj) => {
  const req = await authAxios.post('/groups/api/create', obj)
  const res = await req.data
  const groups = mapGroups(res)
  return groups
}

export const createGroupCompleted = (data) => ({
  type: 'CREATE_GROUP_COMPLETED',
  payload: data
})
// actions for retrieving/editing a single groups =====================================================================

export const groupPageCompleted = data => ({
  type: 'GROUP_POST_COMPLETED',
  payload: data
})

export const groupPostCompleted = data => ({
  type: 'GROUP_POST_COMPLETED',
  payload: data
})

const getGroupById = async (groupId) => {
  const req = await authAxios.get(`/groups/api/groups/${groupId}`)
  const res = await req.data
  const group = mapGroup(res)
  return group
}

const getGroupPosts = async (groupId) => {
  const req = await authAxios.get(`/posts/api/groupPost/${groupId}`)
  const res = await req.data
  const posts = mapPosts(res)
  return posts.reverse()
}

export const getGroupPage = async (groupId) => {
  const group = await getGroupById(groupId)
  const posts = await getGroupPosts(groupId)
  return {
    group: group,
    posts: posts
  }
}

export const getGroupPageCompleted = (data) => ({
  type: 'GET_GROUP_PAGE_COMPLETE',
  payload: data
})
//=========================================================

export const cleanUpGroupPgae = () => ({
  type: 'CLEAN_UP_GROUP_PAGE'
})
//=========================================================

export const joinGroup = async (obj) => {
  const req = await authAxios.post('/groups/api/join', obj)
  const res = await req.data
  const group = mapGroup(res.data)
  return group
}

export const joinGroupCompleted = (data) => ({
  type: 'JOIN_GROUP_COMPLETED',
  payload: data
})
//=========================================================

export const leaveGroup = async (obj) => {
  const req = await authAxios.delete(`/groups/api/leave/${obj.groupId}/${obj.userId}`)
  const res = await req.data
  const group = mapGroup(res)
  return group
}

export const leaveGroupCompleted = (data) => ({
  type: 'LEAVE_GROUP_COMPLETED',
  payload: data
})
//=========================================================

export const editGroupDescription = async (obj) => {
  const req = await authAxios.put('/groups/api/discription', obj)
  const res = await req.data
  const group = mapGroup(res)
  return group
}

export const editGroupDescriptionCompleted = (data) => ({
  type: 'EDIT_GROUP_DESCRIPTION_COMPLETED',
  payload: data
})
//=========================================================

export const updateGroupVotes = async (obj) => {
  const req = await authAxios.put('/groups/api/groupPage/votes', obj)
  const res = await req.data
  const group = mapGroup(res)
  return group
}

export const updateGroupVotesCompleted = (data) => ({
  type: 'UPDATE_GROUP_VOTES_COMPLETED',
  payload: data
})
//=========================================================

export const disbandGroup = async (obj) => {
  const req = await authAxios.delete(`/groups/api/disband/${obj}`)
  const res = await req.data
  return res
}

export const disbandGroupCompleted = (data) => ({
  type: 'DISBAND_GROUP_COMPLETED',
  payload: data
})
//=========================================================

export const createGroupPost = async (obj) => {
  console.log(obj)
  const req = await authAxios.post('/posts/api/groupPosts/create', obj)
  const res = await req.data
  const posts = mapPosts(res)
  return posts.reverse()
}

export const createGroupPostCompleted = (data) => ({
  type: 'CREATE_GROUP_POST_COMPLETED',
  payload: data
})
//=========================================================

export const deleteGroupPost = async (obj) => {
  let { groupId, postId } = obj
  const req = await authAxios.delete(`/posts/api/groupPost/${groupId}/${postId}`)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const deleteGroupPostCompleted = (data) => ({
  type: 'DELETE_GROUP_POST_COMPLETED',
  payload: data
})
//=========================================================

export const editGroupPost = async (obj) => {
  const req = await authAxios.put('/posts/api/groupPost/edit/post', obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const editGroupPostCompleted = data => ({
  type: 'EDIT_GROUP_POST_COMPLETED',
  payload: data
})
//=========================================================

export const updateGroupPostVotes = async (obj) => {
  const req = await authAxios.put('/posts/api/groupPost/edit/votes', obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const updateGroupPostVotesCompleted = data => ({
  type: 'UPDATE_GROUP_POSTS_VOTES_COMPLETED',
  payload: data
})
//=========================================================

export const makeGroupComment = async obj => {
  const req = await authAxios.post('/comments/api/groupComments/create', obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const makeGroupCommentCompleted = data => ({
  type: 'MAKE_GROUP_cOMMENT_COMPLETED',
  payload: data
})
//=========================================================

export const updateGroupCommentVotes = async obj => {
  const req = await authAxios.put('/comments/api/groupComments/update/votes', obj)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const updateGroupCommentVotesCompleted = data => ({
  type: 'UPDATE_GROUP_COMMENT_VOTES_COMPLETED',
  payload: data
})
//=========================================================

export const deleteGroupComment = async obj => {
  let { commentId, groupId } = obj
  const req = await authAxios.delete(`/comments/api/groupComments/delete/${commentId}/${groupId}`)
  const res = await req.data
  const posts = mapPosts(res.data)
  return posts.reverse()
}

export const deleteGroupCommentCompleted = data => ({
  type: 'DELETE_GROUP_COMMENT_COMPLETED',
  payload: data
})
//=========================================================

export const removeUser = async obj => {
  let { groupId, userId } = obj
  const req = await authAxios.delete(`/groups/api/remove/${groupId}/${userId}`)
  const res = await req.data
  console.log(res)
  const group = mapGroup(res.data)
  return group
}

export const removeUserCompleted = data => ({
  type: 'REMOVE_USER_COMPLETED',
  payload: data
})
//=========================================================

export const makeGroupAdmin = async obj => {
  const req = await authAxios.put('/groups/api/groups/groupAdmin', obj)
  const res = await req.data
  const group = mapGroup(res.data)
  return group
}

export const makeGroupAdminCompleted = data => ({
  type: 'MAKE_GROUP_ADMIN_COMPLETED',
  payload: data
})
//=========================================================

export const removeGroupAdmin = async obj => {
  const req = await authAxios.put('/groups/api/groups/remove/admin', obj)
  const res = await req.data
  const group = mapGroup(res.data)
  return group
}

export const removeGroupAdminCompleted = data => ({
  type: 'MAKE_GROUP_ADMIN_COMPLETED',
  payload: data
})
//=========================================================

export const transferGroupOwner = async obj => {
  const req = await authAxios.put('/groups/api/groups/make/owner', obj)
  const res = await req.data
  const group = mapGroup(res.data)
  return group
}

export const transferGroupOwnerCompleted = data => ({
  type: 'MAKE_GROUP_ADMIN_COMPLETED',
  payload: data
})
// actions for retrieving/editing friends =============================================================================

export const editFriendsCompleted = data => ({
  type: 'EDIT_FRIENDS_COMPLETED',
  payload: data
})

export const addFriend = async obj => {
  const req = await authAxios.post('/users/api/add/friend', obj)
  const res = await req.data
  const user = mapUser(res.data)
  return user
}

export const cancelFriend = async obj => {
  const req = await authAxios.delete(`/users/api/cancel/friend/${obj}`)
  const res = await req.data
  const user = mapUser(res.data)
  return user
}

export const acceptRequest = async obj => {
  const req = await authAxios.post('/users/api/accept/request', obj)
  const res = await req.data
  const user = mapUser(res.data)
  return user
}

export const denyRequest = async obj => {
  const req = await authAxios.put('/users//api/deny/request', obj)
  const res = await req.data
  const user = mapUser(res.data)
  return user
}

export const confirmNotification = async obj => {
  const req = await authAxios.put('/users/api/confirm/notification', obj)
  const res = await req.data
  const user = mapUser(res.data)
  return user
}

export const removeFriend = async obj => {
  const req = await authAxios.delete(`/users/api/remove/friend/${obj}`)
  const res = await req.data
  const user = mapUser(res.data)
  return user
}