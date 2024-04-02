import React, { useEffect } from 'react'
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

import ProfilePosts from './posts/profilePosts'
import PostForm from '../forms/postForm/postForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './profile.css';
import Post from '../mainPage/post/mainPost';


const Profile = (props) => {
  let { profile, loggedInUser, isLoggedIn, profilePosts, onCleanUpProfile } = props

  library.add(faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots, faUserCircle);

  useEffect(() => {
    return () => {
      onCleanUpProfile()
    }
  }, [onCleanUpProfile])

  return (
    <div className="profile-container">
      {profile ? isLoggedIn && loggedInUser.userId === profile.userId ?
        <div className="profile-wrapper">
          <div className="profile-header">
            <div className="profile-detail">
              <div className="user-name">
                <FontAwesomeIcon className="user-icon-profile" icon="user-circle" />
                <h1>{profile.name}</h1>
              </div>
              <h2>User Name: {profile.userName}</h2>
              <h3> Email: {profile.email}</h3>
              <h3>Total posts: 0</h3>
              <h3>Group: {loggedInUser ? loggedInUser.groups.map(group => <p>{group.groupName}, </p>) : null}</h3>
            </div>
            <div className="profile-post-form">
              <PostForm {...props} />
            </div>
          </div>

          {/* <div>
            <h3>Groups:</h3>
            <div>
              {loggedInUser ? loggedInUser.groups.map(group => (
                <div>
                  <h3>{group.groupName}</h3>
                  <div>Likes: {group.likes}</div>
                  <div>Dislikes: {group.dislikes}</div>
                </div>
              )) : null}
            </div>
          </div> */}

          <div className="profile-posts">
            {profile && profile.posts.length > 0 ? profile.posts.map(post => (
              <Post {...props} key={post.postId} post={post} />
            )) : <p>You Haven't Made Any Posts Yet</p>}
          </div>
        </div>
        :
        <div className="profile-wrapper">
          <div className="profile-detail">
            <h1>{profile.fullName}'s Profile</h1>
            <h2>{profile.userName}</h2>
          </div>

          <div className="profile-posts">
            {profile && profile.posts.length > 0 ? profile.posts.filter(post => post.isHidden === 0).map(post => (
              <Post {...props} key={post.postId} post={post} />
            )) : <p>You Haven't Made Any Posts Yet</p>}
          </div>
        </div>
        :
        <span>Loading Profile...</span>}
    </div>
  )
}

export default Profile