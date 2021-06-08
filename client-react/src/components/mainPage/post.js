import React, { useEffect, useState } from 'react'

const Post = ({ post, onUpdateVotes }) => {
  let [commentList, setList] = useState([])

  let [likes, setLikes] = useState(0)
  let [dislikes, setDislikes] = useState(0)

  useEffect( () => {
    setLikes(post.likes)
    setDislikes(post.dislikes)
  },[post])

  return (
    <div>
      <h3>{post.author}</h3>
      <div>
        <h4>{post.title}</h4>
        <p>{post.body}</p>
      </div>
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
      <div>
        {commentList.length === 0 ? null : commentList.map(comment => (
          <div>
            <h5>{comment.author}</h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Post