import React, { useEffect, useState} from 'react'

const Comment = (props) => {
  let { comment } = props 
  let [likes, setLikes] = useState()
  let [dislikes, setDislikes] = useState()

  useEffect(() => {
    setDislikes(comment.dislikes)
    setLikes(comment.likes)
  }, [comment])

  return (
    <div key={comment.id}>
      <h5>{comment.author}</h5>
      <p>{comment.body}</p>
      <div>
        <button onClick={() => setLikes(likes + 1)}>
          <div>Likes</div>
          <div>{likes}</div>
        </button>
        <button onClick={() => setDislikes(dislikes + 1)}>
          <div>Dislikes</div>
          <div>{dislikes}</div>
        </button>
      </div>
    </div>
  )
}

export default Comment