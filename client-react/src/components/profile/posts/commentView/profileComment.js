import React, { useEffect, useState } from 'react'

const ProfileComment = (props) => {
  let { comment, postAuthor, loggedInUser, isLoggedIn, onUpdateCommentVotesByUserId, userId, ondeleteCommentByUserId } = props
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
        <button onClick={() => onUpdateCommentVotesByUserId({type:'likes',current:likes,commentId:comment.id,userId:userId})}>
          <div>Likes</div>
          <div>{likes}</div>
        </button>
        <button onClick={() => onUpdateCommentVotesByUserId({type:'dislikes',current:dislikes,commentId:comment.id,userId:userId})}>
          <div>Dislikes</div>
          <div>{dislikes}</div>
        </button>
        <button
          style={isVisible ? { display: 'block' } : { display: 'none' }}
          onClick={() => ondeleteCommentByUserId({commentId:comment.id,userId:userId})}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProfileComment