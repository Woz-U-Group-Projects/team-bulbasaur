import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import PostForm from '../forms/postForm/postForm';
import Post from './post/mainPost'
import GroupView from './groupsView/groupView';
import FriendsView from './friendsView/friendsView';


//css
import './mainPage.css'

const MainPage = (props) => {
  const { posts, onGetPosts, onGetUsers, onUpdateVotes, isLoggedIn, onGetGroups } = props;
  const [postList, setPosts] = useState([]);

  useEffect(() => {
    onGetPosts()
    onGetUsers()
    onGetGroups()
  }, [onGetPosts, onGetUsers, onGetGroups])

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  return (
    <div className='mainPage-container'>
      <div className='groupList'>
        <GroupView {...props} />
      </div>

      <div className='postsList'>
        <div className='postForm' style={isLoggedIn === true ? { display: 'block' } : { display: 'none' }}>
          <PostForm {...props} />
        </div>

        <div className='posts'>
          {postList.length === 0 ? <p>no posts have been made yet</p> : postList.map(post => {
            return <Post {...props} key={post.postId} post={post} onUpdateVotes={onUpdateVotes} />
          })}
        </div>
      </div>

      <div className='friendList'>
        <FriendsView {...props} />
      </div>
    </div>
  )
}

export default MainPage