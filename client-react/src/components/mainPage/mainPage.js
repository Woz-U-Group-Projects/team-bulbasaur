import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Post from './post'

const MainPage = ({ posts, users, onGetPosts, onGetUsers, onUpdateVotes }) => {
  let [postList, setPosts] = useState([])
  let [usersList, setUsers] = useState([])

  useEffect(() => {
    onGetPosts()
    onGetUsers()
  }, [onGetPosts, onGetUsers])

  useEffect( () => {
    setPosts(posts)
    setUsers(users)
  },[posts, users])

  return (
    <div>
      <div className='users'>
        {usersList.length === 0 ? <p>Something Went Wrong</p> : usersList.map( user => (
          <div key={user.id}>
            <Link to={`/profile/${user.id}`}>{user.name}</Link>
          </div>
        ))}
      </div>
      <div className='posts'>
        {postList.length === 0 ? <p>no posts have been made yet</p> : postList.map(post => {
          return <Post key={post.id} post={post} onUpdateVotes={onUpdateVotes}  />
        })}
      </div>
    </div>
  )
}

export default MainPage