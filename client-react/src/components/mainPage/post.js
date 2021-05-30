import React, { useState } from 'react'

const Post = ({ post, onAddVote }) => {
  let [likes, setLikes] = useState(post.likes)
  let [dislikes, setDislikes] = useState(post.dislikes)

  return (
    <div>
      <h1>{post.author}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>
        <button onClick={ () => onAddVote('likes', likes, post.id) }>
          <div>Likes</div>
          <div>{likes}</div>
        </button>
        <button onClick={ () => onAddVote('dislikes', dislikes, post.id)}>
          <div>dislikes</div>
          <div>{dislikes}</div>
        </button>
      </div>
    </div>
  )
}

export default Post