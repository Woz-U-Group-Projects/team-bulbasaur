import React, { useEffect, useState } from 'react'
import PostForm from '../forms/postForm'
import Post from '../mainPage/post'

const Profile = (props) => {
  let [isUserLoggedIn] = useState(props.loggedInUser === undefined ? false : true)
  let [formView, setView] = useState(false)
  let {onGetPostsById, onGetProfileById, userId, loggedInUser} = props

  useEffect( () => {
    onGetProfileById(userId)
    onGetPostsById(userId)
  },[onGetProfileById, onGetPostsById, userId])

  if(isUserLoggedIn){
    if(props.loggedInUser.id === props.profile.id){
      return (
        <div>
          <h1>User Is Logged In</h1>
          <div>
            {props.userPosts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : props.userPosts.map( post => (
              <Post key={post.id} post={post} onUpdateVotes={props.onUpdateVotes} />
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>{props.profile.name}'s Profile</h1> 
          <h2>{props.profile.userName}</h2>
          <div>
            {props.userPosts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : props.userPosts.map( post => (
              <Post key={post.id} post={post} onUpdateVotes={props.onUpdateVotes} />
            ))}
          </div>
        </div>
      )
    }
  } else {
    return (
      <div>
        <h1>{props.profile.name}'s Profile</h1> 
        <h2>{props.profile.userName}</h2>
        <div>
          <div>
            <h3>Make A New Post</h3>
            <button onClick={() => setView(!formView)}>{formView === false ? 'Start' : 'cancel'}</button>
          </div>
          <div style={formView === false ? {display: 'none'} : {display: 'block'}}>
            <PostForm />
          </div>
        </div>
        <div>
          {props.userPosts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : props.userPosts.map( post => (
            <Post key={post.id} post={post} onUpdateVotes={props.onUpdateVotes} />
          ))}
        </div>
      </div>
    )
  }
}

export default Profile