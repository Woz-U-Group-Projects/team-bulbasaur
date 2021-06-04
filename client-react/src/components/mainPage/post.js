import React, { useEffect, useState } from 'react'

const Post = ({ post, onUpdateVotes }) => {
  let [likes, setLikes] = useState(0)
  let [dislikes, setDislikes] = useState(0)

  useEffect( () => {
    setLikes(post.likes)
    setDislikes(post.dislikes)
  },[post])

  return (
    <div>
      <h1>{post.author}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>
        <button onClick={() => onUpdateVotes('likes', likes, post.id)}>
          <div>Likes</div>
          <div>{likes}</div>
        </button>
        <button onClick={() => onUpdateVotes('dislikes', dislikes, post.id)}>
          <div>dislikes</div>
          <div>{dislikes}</div>
        </button>
      </div>
    </div>
  )
}

export default Post