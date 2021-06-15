import React from 'react'
import ProfilePostForm from '../forms/profilePostForm/profilePostForm'
import ProfilePosts from './posts/profilePosts'

const Profile = (props) => {
  let { profile, loggedInUser, isLoggedIn, profilePosts } = props

  return (
    <div>
      {isLoggedIn && loggedInUser.id === profile.id ?
        <div>
          <h1>{profile.name}'s Profile</h1>
          <h2>{profile.userName}</h2>
          <h3>{profile.email}</h3>
          <div>
            <h3>Make A New Post</h3>
            <ProfilePostForm {...props} userId={profile.id} />
          </div>
          <div>
            {profilePosts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : profilePosts.map(post => (
              <ProfilePosts {...props} key={post.id} userId={profile.id} post={post} />
            ))}
          </div>
        </div> :
        <div>
          <h1>{profile.name}'s Profile</h1>
          <h2>{profile.userName}</h2>
          <div>
            {profilePosts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : profilePosts.filter(post => post.isHidden === 0).map(post => (
              <ProfilePosts {...props} userId={profile.id} key={post.id} post={post} />
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default Profile