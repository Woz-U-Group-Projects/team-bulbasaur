import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostForm from '../forms/postForm'
import Post from './post'

const MainPage = ({ posts, users, onGetPosts, onGetUsers, onUpdateVotes, setUserId }) => {
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
    <div>
      <div className='usersList'>
        {usersList.length === 0 ? <p>Something Went Wrong</p> : usersList.map(user => (
          <div key={user.id}>
            <Link onClick={() => setUserId(user.id)} to={`/profile/${user.id}`} style={{ textDecoration: 'none' }} >
              {user.userName}
            </Link>
          </div>
        ))}
      </div>
      <div className='postsList'>
        <div className='postForm'>
          <PostForm />
        </div>
        <div className='posts'>
          {postList.length === 0 ? <p>no posts have been made yet</p> : postList.map(post => {
            return <Post key={post.id} post={post} onUpdateVotes={onUpdateVotes} />
          })}
        </div>
      </div>
    </div>
  )
}

export default MainPage