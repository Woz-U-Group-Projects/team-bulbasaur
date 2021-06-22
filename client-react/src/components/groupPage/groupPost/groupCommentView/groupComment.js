import React, { useEffect, useState } from 'react'

const GroupComment = (props) => {
  let { comment, postAuthor, loggedInUser, isLoggedIn, onUpdateGroupCommentVotes, onDeleteGroupComment, groupId } = props
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
        <button onClick={() => onUpdateGroupCommentVotes({type:'likes',likes:likes,commentId:comment.id,groupId:groupId})}>
          <div>Likes</div>
          <div>{likes}</div>
        </button>
        <button onClick={() => onUpdateGroupCommentVotes({type:'dislikes',dislikes:dislikes,commentId:comment.id,groupId:groupId})}>
          <div>Dislikes</div>
          <div>{dislikes}</div>
        </button>
        <button
          style={isVisible ? { display: 'block' } : { display: 'none' }}
          onClick={() => isVisible ? onDeleteGroupComment({commentId:comment.id, groupId: groupId}) : null}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default GroupComment