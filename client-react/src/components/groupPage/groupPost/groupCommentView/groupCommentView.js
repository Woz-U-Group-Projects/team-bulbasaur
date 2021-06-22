import React from 'react'
import GroupCommentForm from '../../../forms/groupCommentForm/groupCommentForm'
import GroupComment from './groupComment'

const GroupCommentView = (props) => {
  let { commentList, commentView, groupId } = props
  return (
    <div style={commentView === false ? {display: 'none'} : {display: 'block'}}>
      {commentList.length === 0 ? <p>No Comments Yet</p> : 
        <div>
          {commentList.map(comment => (
            <GroupComment key={comment.id} {...props} comment={comment} />
          ))}
        </div>
      }
      <GroupCommentForm groupId={groupId} {...props} />
    </div>
  )
}

export default GroupCommentView