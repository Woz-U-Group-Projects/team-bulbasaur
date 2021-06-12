import React from 'react'
import CommentForm from '../forms/commentForm'
import Comment from './comment'

const CommentView = (props) => {
  let { commentList, commentView } = props

  return (
    <div style={commentView === false ? {display: 'none'} : {display: 'block'}}>
      {commentList.length === 0 ? <p>No Comments Yet</p> : 
        <div>
          {commentList.map(comment => (
            <Comment key={comment.id} {...props} comment={comment} />
          ))}
        </div>
      }
      <CommentForm {...props} />
    </div>
  )
}

export default CommentView