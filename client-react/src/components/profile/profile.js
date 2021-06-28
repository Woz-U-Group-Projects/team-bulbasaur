import React, { useEffect } from 'react'
import ProfilePostForm from '../forms/profilePostForm/profilePostForm'
import ProfilePosts from './posts/profilePosts'

import './profile.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

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
      {profile ? isLoggedIn && loggedInUser.id === profile.id ?
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
              <ProfilePostForm {...props} userId={profile.id} />
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
            {profilePosts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : profilePosts.map(post => (
              <ProfilePosts {...props} key={post.id} userId={profile.id} post={post} />
            ))}
          </div>
        </div>
        :
        <div className="profile-wrapper">
          <div className="profile-detail">
            <h1>{profile.name}'s Profile</h1>
            <h2>{profile.userName}</h2>
          </div>

          <div className="profile-posts">
            {profilePosts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : profilePosts.filter(post => post.isHidden === 0).map(post => (
              <ProfilePosts {...props} userId={profile.id} key={post.id} post={post} />
            ))}
          </div>
        </div>
        :
        <span>Loading Profile...</span>}
    </div>
  )
}

export default Profile