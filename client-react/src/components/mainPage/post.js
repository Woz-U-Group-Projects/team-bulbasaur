import React, { useEffect, useState } from 'react'

const Post = ({ post, set }) => {
  let [likes, setLikes] = useState(post.likes)
  let [dislikes, setDislikes] = useState(post.dislikes)

  useEffect(() => {
    return () => set({
      postId: post.id,
      data: [{
        type: 'likes',
        current: likes,
        postId: post.id
      }, {
        type: 'dislikes',
        current: dislikes,
        postId: post.id
      }]
    })
  })

  return (
    <div>
      <h1>{post.author}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>
        <button onClick={() => setLikes(likes + 1)}>
          <div>Likes</div>
          <div>{likes}</div>
        </button>
        <button onClick={() => setDislikes(dislikes + 1)}>
          <div>dislikes</div>
          <div>{dislikes}</div>
        </button>
      </div>
    </div>
  )
}

export default Post