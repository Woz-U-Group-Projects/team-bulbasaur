import React, { useEffect, useState } from 'react'
import PostForm from '../forms/postForm/postForm'
import ProfilePosts from './posts/profilePosts'

const Profile = (props) => {
  let { profile, loggedInUser, isLoggedIn, profilePosts } = props
  let [posts, setPosts] = useState()

  useEffect(() => {
    if(profilePosts.length === 0){
      setPosts(profile.posts)
      console.log('1',posts)
    } else {
      setPosts(ProfilePosts)
      console.log('2',posts)
    }
  },[profilePosts, profile.posts])
  
  return (
    <div>
      {isLoggedIn && loggedInUser.id === profile.id ?
        <div>
          <h1>{profile.name}'s Profile</h1>
          <h2>{profile.userName}</h2>
          <h3>{profile.email}</h3>
          <div>
            <h3>Make A New Post</h3>
            <PostForm {...props} />
          </div>
          <div>
            {profile.posts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : profile.posts.map(post => (
              <ProfilePosts {...props} key={post.id} userId={profile.id} post={post} />
            ))}
          </div>
        </div> :
        <div>
          <h1>{profile.name}'s Profile</h1>
          <h2>{profile.userName}</h2>
          <div>
            {profile.posts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : profile.posts.filter(post => post.isHidden === 0).map(post => (
              <ProfilePosts {...props} key={post.id} post={post} />
            ))}
          </div>
        </div> 
      }
    </div>
  )
}

export default Profile