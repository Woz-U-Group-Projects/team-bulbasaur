import React, { useEffect } from 'react'
import ProfilePostForm from '../forms/profilePostForm/profilePostForm'
import ProfilePosts from './posts/profilePosts'

import './profile.css';

const Profile = (props) => {
  let { profile, loggedInUser, isLoggedIn, profilePosts, onCleanUpProfile } = props

  useEffect(()=>{
    return ()=>{
      onCleanUpProfile()
    }
  }, [onCleanUpProfile])

  return (
    <div className="profile-container">
      {profile ? isLoggedIn && loggedInUser.id === profile.id ?
        <div className="profile-wrapper">
          <div className="profile-header">
            <div className="profile-detail">
              <h1>{profile.name}</h1>
              <h2>{profile.userName}</h2>
              <h3>{profile.email}</h3>
            </div>
            <div className="profile-post-form">
              <ProfilePostForm {...props} userId={profile.id} />
            </div>
          </div>
          
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