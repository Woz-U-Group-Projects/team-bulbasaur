import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import PostForm from '../forms/postForm'
import Post from './post'

const MainPage = (props) => {
  let { posts, users, onGetPosts, onGetUsers, onUpdateVotes, isLoggedIn } = props
  let [postList, setPosts] = useState([])

  useEffect(() => {
    onGetPosts()
    onGetUsers()
  }, [onGetPosts, onGetUsers])

  useEffect(() => {
    setPosts(posts)
  }, [posts, users])

  return (
    <div className='mainPage-container'>
      <div className='postsList'>
        <h2>Make Posts Here to Start Conversations With Users Around The World</h2>
        <div className='postForm' style={isLoggedIn === true ? { display: 'block' } : { display: 'none' }}>
          <h3>Make A New Post</h3>
          <PostForm {...props} />
        </div>
        <div className='posts'>
          {postList.length === 0 ? <p>no posts have been made yet</p> : postList.map(post => {
            return <Post {...props} key={post.id} post={post} onUpdateVotes={onUpdateVotes} />
          })}
        </div>
      </div>
      <div className='usersList'>
        <h3>Popular Groups</h3>
        
      </div>
    </div>
  )
}

export default MainPage