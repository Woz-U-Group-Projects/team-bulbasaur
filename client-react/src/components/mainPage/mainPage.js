import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import PostForm from '../forms/postForm/postForm'
import Post from './post/mainPost'
import CreateGroupForm from '../forms/createGroupForm/createGroupFrom'
//css
import './mainPage.css'

const MainPage = (props) => {
  let { posts, users, onGetPosts, onGetUsers, onUpdateVotes, isLoggedIn, onGetGroups, groups, loggedInUser, onJoinGroup } = props
  let [postList, setPosts] = useState([])
  let [groupFormView, setFormView] = useState(false)

  useEffect(() => {
    onGetPosts()
    onGetUsers()
    onGetGroups()
  }, [onGetPosts, onGetUsers, onGetGroups])

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
        <div style={groupFormView?{display:'block'}:{display:'none'}}>
          <CreateGroupForm setFormView={setFormView} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <h3>Popular Groups</h3>
          <button
            onClick={() => isLoggedIn ? setFormView(true) : alert('you must be logged in to create a new group')}
          >
            Create New Group
          </button>
        </div>
        <div>
          {groups.length === 0 ? null : groups.map(group => (
            <div key={group.groupId}>
              <h4>{group.groupName}</h4>
              <h4># of Users: {group.users.length}</h4>
              <div>
                <button>
                  <div>Likes</div>
                  <div>{group.likes}</div>
                </button>
                <button>
                  <div>Dislikes</div>
                  <div>{group.dislikes}</div>
                </button>
                <button onClick={() => {
                  isLoggedIn ? onJoinGroup({ groupId: group.groupId, userId: isLoggedIn ? loggedInUser.id : null }) : alert('you must login to join a group')
                }}>
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainPage