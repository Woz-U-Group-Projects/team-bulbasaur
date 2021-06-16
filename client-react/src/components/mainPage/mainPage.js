import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import PostForm from '../forms/postForm/postForm'
import Post from './post/mainPost';
import './mainPage.css';

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
      <div className='groupList'>
        <h3>Popular Groups</h3>
      </div>

      <div className='postsList'>
        <div className='postForm' style={isLoggedIn === true ? { display: 'block' } : { display: 'none' }}>
          <PostForm {...props} />
        </div>
        <div className='posts'>
          {postList.length === 0 ? <p>no posts have been made yet</p> : postList.map(post => {
            return <Post {...props} key={post.id} post={post} onUpdateVotes={onUpdateVotes} />
          })}
        </div>
      </div>
      
      <div className='friendList'>
        <h3>Friend List</h3>
      </div>
    </div>
  )
}

export default MainPage