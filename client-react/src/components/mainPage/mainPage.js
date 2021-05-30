import React, { useState } from 'react'
import Post from './post'

const MainPage = (props) => {

  return (
    <div>
      {props.posts.length === 0 ? <p>no posts have been made yet</p> : props.posts.map( post => {
        return <Post key={post.id} post={post} onAddVote={props.onAddVote} />
      })}
    </div>
  )
}

export default MainPage