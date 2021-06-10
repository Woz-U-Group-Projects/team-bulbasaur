import axios from 'axios';

const cookie = document.cookie
  
const authAxios = axios.create({
  headers: {
    withCredentials: true,
    authorization: `Bearer ${cookie}`
  },
  credentials: 'same-origin'
})
//========================================================================================

export const signup = async (object) => {
  const req = await axios.post('/users/api/signup', object)
  const data = await req.data

  console.log(data)

  return data
}

export const signupCompleted = (data) => ({
  type: 'SIGNUP_COMPLETED',
  payload: data
})
//========================================================================================

export const login = async (object) => {

  const req = await authAxios.post('/users/api/login', object)
  const res = await req.data
  
  if(res.result===false){
    return res
  } else {
    const data = {
      result: true,
      message: res.message,
      user: {
        id: res.user.UserId,
        name: res.user.FullName,
        userName: res.user.UserName,
        email: res.user.Email,
        admin: res.user.Admin,
        posts: res.user.posts.map( post => ({
          id: post.PostId,
          authorId: post.UserId,
          author: post.user.UserName,
          title: post.PostHead,
          body: post.PostBody,
          comments: post.comments.map( comment => ({
            id: comment.CommentId,
            authorId: comment.UserId,
            author: comment.user.UserName,
            body: comment.CommentBody,
            likes: comment.Likes,
            dislikes: comment.Dislikes
          })),
          likes: post.Likes,
          dislikes: post.Dislikes,
          isHidden: post.Visible
        }))
      }
    }
    return data
  }
}

export const loginCompleted = (data) => ({
  type: 'LOGIN_COMPLETED',
  payload: data
})
//========================================================================================

export const logout = async () => {
  const req = await axios.get('/users/api/logout')
  const data = await req.data
  console.log(data)
  return data
}

export const logoutCompleted = (data) => ({
  type: 'LOGOUT_COMPLETED',
  payload: data
})
//========================================================================================

export const getUsers = async () => {
  const req = await axios.get('/users/api')
  const data = await req.data

  const users = data.map( user => {
    const posts = user.posts.map( post => {
      const comments = post.comments.map( comment => ({
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
        authorId: post.UserId,
        author: post.user.UserName,
        title: post.PostHead,
        body: post.PostBody,
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
      posts: posts
    }
  })
  
  return users
}

export const getUsersCompleted = (users) => ({
  type: 'GET_USERS_COMPLETED',
  payload: users
})
//========================================================================================

export const getProfileById = async (userId) => {
  const req = await authAxios.get(`/users/api/profile/${userId}`)
  const data = await req.data
  
  const profile = {
    status: data.result,
    data: {
      id: data.data.UserId,
      name: data.data.FullName,
      userName: data.data.UserName
    }
  }
  return profile
}

export const getProfileByIdCompleted = (user) => {
  return({
    type: 'GET_PROFILE_BY_ID_COMPLETED', 
    payload: user
  })
}
//========================================================================================

export const getPosts = async () => {
  const req = await axios.get('/posts/api')
  const data = await req.data

  const posts = data.map(post => ({
    id: post.PostId,
    author: post.user.UserName,
    authorId: post.UserId,
    title: post.PostHead,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes,
    comments: post.comments.reverse().map(comment => ({
      id: comment.CommentId,
      body: comment.CommentBody,
      likes: comment.Likes,
      dislikes: comment.Dislikes,
      author: comment.user.UserName
    }))
  }))
  return posts.reverse()
}

export const getPostsCompleted = (posts) => ({
  type: 'GET_POSTS_COMPLETED',
  payload: posts
})
//========================================================================================

export const getPostsByUserId = async (userId) => {
  const req = await axios.get(`/posts/api/${userId}`)
  const data = await req.data
  const posts = data.map(post => ({
    id: post.PostId,
    author: post.user.UserName,
    authorId: post.UserId,
    title: post.PostHead,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes,
    comments: post.comments.reverse().map(comment => ({
      id: comment.CommentId,
      body: comment.CommentBody,
      likes: comment.Likes,
      dislikes: comment.Dislikes,
      author: comment.user.UserName
    }))
  }))
  return posts.reverse()
}

export const getPostsByUserIdCompleted = (posts) => ({
  type: 'GET_POSTS_BY_USER_ID_COMPLETED',
  payload: posts
})
//========================================================================================

export const updateVotes = async (type, current, postId) => {
  if (type === 'likes') {
    const req = await axios.put(`/posts/api/${type}/${postId}`, { likes: current })
    const data = await req.data

    const posts = data.map(post => ({
      id: post.PostId,
      author: post.user.UserName,
      authorId: post.UserId,
      title: post.PostHead,
      body: post.PostBody,
      likes: post.Likes,
      dislikes: post.Dislikes,
      comments: post.comments.reverse().map(comment => ({
        id: comment.CommentId,
        body: comment.CommentBody,
        likes: comment.Likes,
        dislikes: comment.Dislikes,
        author: comment.user.UserName
      }))
    }))

    return posts.reverse()
  }
  if (type === 'dislikes') {
    const req = await axios.put(`/posts/api/${type}/${postId}`, { dislikes: current })
    const data = await req.data

    const posts = data.map(post => ({
      id: post.PostId,
      author: post.user.UserName,
      authorId: post.UserId,
      title: post.PostHead,
      body: post.PostBody,
      likes: post.Likes,
      dislikes: post.Dislikes,
      comments: post.comments.reverse().map(comment => ({
        id: comment.CommentId,
        body: comment.CommentBody,
        likes: comment.Likes,
        dislikes: comment.Dislikes,
        author: comment.user.UserName
      }))
    }))

    return posts.reverse()
  }
}

export const updateVotesCompleted = (posts) => ({
  type: 'ADD_VOTE_COMPLETED',
  payload: posts
})
//========================================================================================

export const makePost = async (object) => {
  const req = await authAxios.post('/posts/api', object)
  const res = await req.data
  console.log(res)

  const posts = res.data.map(post => ({
    id: post.PostId,
    author: post.user.UserName,
    authorId: post.UserId,
    title: post.PostHead,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes,
    comments: post.comments.map(comment => ({
      id: comment.CommentId,
      body: comment.CommentBody,
      likes: comment.Likes,
      dislikes: comment.Dislikes,
      author: comment.user.UserName
    }))
  }))
  return posts.reverse()
}
  
export const makePostCompleted = (res) => ({
  type: 'MAKE_POST_COMPLETED',
  payload: res
})
//========================================================================================

export const makeComment = async (obj) => {
  console.log(obj)
  const req = await authAxios.post('/comments/api', obj)
  const res = await req.data
  
  const posts = res.data.map(post => ({
    id: post.PostId,
    author: post.user.UserName,
    authorId: post.UserId,
    title: post.PostHead,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes,
    comments: post.comments.map(comment => ({
      id: comment.CommentId,
      body: comment.CommentBody,
      likes: comment.Likes,
      dislikes: comment.Dislikes,
      author: comment.user.UserName
    }))
  }))
  return posts.reverse()
}

export const makeCommentCompleted = (obj) => ({
  type: 'MAKE_COMMENT_COMPLETED',
  payload: obj
})
//========================================================================================

export const deletePost = async (postId) => {
  const req = await authAxios.delete(`posts/api/${postId}`)
  const res = await req.data

  const posts = res.data.map(post => ({
    id: post.PostId,
    author: post.user.UserName,
    authorId: post.UserId,
    title: post.PostHead,
    body: post.PostBody,
    likes: post.Likes,
    dislikes: post.Dislikes,
    comments: post.comments.map(comment => ({
      id: comment.CommentId,
      body: comment.CommentBody,
      likes: comment.Likes,
      dislikes: comment.Dislikes,
      author: comment.user.UserName
    }))
  }))
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