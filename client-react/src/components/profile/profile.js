import React from 'react'
import PostForm from '../forms/postForm/postForm'
import ProfilePosts from './profilePosts'

const Profile = (props) => {
  let { profile, loggedInUser, onUpdateVotes, isLoggedIn} = props
  console.log("profile", profile)


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
              <ProfilePosts {...props} key={post.id} post={post} onUpdateVotes={onUpdateVotes} />
            ))}
          </div>
        </div> :
        <div>
          <h1>{profile.name}'s Profile</h1>
          <h2>{profile.userName}</h2>
          <div>
            {profile.posts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : profile.posts.filter(post => post.isHidden === 0).map(post => (
              <ProfilePosts {...props} key={post.id} post={post} onUpdateVotes={onUpdateVotes} />
            ))}
          </div>
        </div> 
      }
    </div>
  )
}

export default Profile