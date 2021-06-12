import React, { useEffect, useState } from 'react'

const Comment = (props) => {
  let { comment, postAuthor, loggedInUser, isLoggedIn, onUpdateCommentVotes } = props
  let [likes, setLikes] = useState()
  let [dislikes, setDislikes] = useState()
  let isVisible = isLoggedIn && ( comment.authorId === loggedInUser.id || postAuthor === loggedInUser.id || loggedInUser.admin === 1 )

  
  useEffect(() => {
    setDislikes(comment.dislikes)
    setLikes(comment.likes)
  }, [comment])

  return (
    <div key={comment.id}>
      <h5>{comment.author}</h5>
      <p>{comment.body}</p>
      <div>
        <button onClick={() => onUpdateCommentVotes('likes', likes, comment.id)}>
          <div>Likes</div>
          <div>{likes}</div>
        </button>
        <button onClick={() => onUpdateCommentVotes('dislikes', dislikes, comment.id)}>
          <div>Dislikes</div>
          <div>{dislikes}</div>
        </button>
        <button
          style={isVisible ? { display: 'block' } : { display: 'none' }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Comment