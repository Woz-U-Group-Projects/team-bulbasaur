import React, { useState } from 'react'
import Post from './post'

const MainPage = (props) => {
  let [posts, setposts] = useState([...props.posts])

  return (
    <div>
      {props.posts.length === 0 ? <p>no posts have been made yet</p> : props.posts.map( post => {
        return <Post key={post.id} post={post} onAddVote={props.onAddVote} />
      })}
    </div>
  )
}

export default MainPage