import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import PostForm from '../forms/postForm'
import Post from '../mainPage/post'

const Profile = (props) => {
  let [isUserLoggedIn] = useState(props.loggedInUser === undefined ? false : true)
  let [formView, setView] = useState(false)
  let { onGetPostsById, onGetProfileById, userId, loggedInUser, posts} = props

  useEffect(() => {
    onGetProfileById(userId)
    onGetPostsById(userId)
  }, [onGetProfileById, onGetPostsById, userId, posts])

  return (
    <div>
      {userId === 1 ? <Redirect to='/'/> : null}
      {isUserLoggedIn ?
        loggedInUser.id === props.profile.id ?
          <div>
            <h1>{props.profile.name}'s Profile</h1>
            <h2>{props.profile.userName}</h2>
            <h3>{props.profile.email}</h3>
            <div>
              <div>
                <h3>Make A New Post</h3>
                <PostForm {...props} />
              </div>
            </div>
            <div>
              {props.userPosts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : props.userPosts.map(post => (
                <Post key={post.id} post={post} onUpdateVotes={props.onUpdateVotes} />
              ))}
            </div>
          </div> :
          <div>
            <h1>{props.profile.name}'s Profile</h1>
            <h2>{props.profile.userName}</h2>
            <div>
              {props.userPosts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : props.userPosts.map(post => (
                <Post key={post.id} post={post} onUpdateVotes={props.onUpdateVotes} />
              ))}
            </div>
          </div> :
          <div>
            <h1>{props.profile.name}'s Profile</h1>
            <h2>{props.profile.userName}</h2>
          <div>
            {props.userPosts.length === 0 ? <p>You Haven't Made Any Posts Yet</p> : props.userPosts.map(post => (
              <Post key={post.id} post={post} onUpdateVotes={props.onUpdateVotes} />
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default Profile