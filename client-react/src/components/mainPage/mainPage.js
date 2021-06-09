import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostForm from '../forms/postForm'
import Post from './post'

const MainPage = (props) => {
  let { posts, users, onGetPosts, onGetUsers, onUpdateVotes, setUserId, isLoggedIn } = props
  let [postList, setPosts] = useState([])
  let [usersList, setUsers] = useState([])

  useEffect(() => {
    onGetPosts()
    onGetUsers()
  }, [onGetPosts, onGetUsers])

  useEffect(() => {
    setPosts(posts)
    setUsers(users)
  }, [posts, users])

  return (
    <div className='mainPage-container'>
      <div className='postsList'>
        <div className='postForm'>
          <div>
            <div style={isLoggedIn === true ? {display: 'block'} : {display: 'none'}}>
              <h3>Make A New Post</h3>
              <PostForm {...props} />
            </div>
          </div>
        </div>
        <div className='posts'>
          {postList.length === 0 ? <p>no posts have been made yet</p> : postList.map(post => {
            return <Post {...props} key={post.id} post={post} onUpdateVotes={onUpdateVotes} />
          })}
        </div>
      </div>
      <div className='usersList'>
        <h3>People You're Following

        </h3>
        {usersList.length === 0 ? <p>Something Went Wrong</p> : usersList.map(user => (
          <div key={user.id}>
            <Link onClick={() => setUserId(user.id)} to={`/profile/${user.id}`} style={{ textDecoration: 'none' }} >
              {user.userName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainPage