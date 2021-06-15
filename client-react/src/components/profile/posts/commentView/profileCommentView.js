import React from 'react'
import ProfileComment from './profileComment'
import ProfileCommentForm from '../../../forms/profileCommentForm/profileCommentForm'

const ProfileCommentView = (props) => {
  let { userId, commentList, commentView} = props
  return (
    <div style={commentView === false ? {display: 'none'} : {display: 'block'}}>
      {commentList.length === 0 ? <p>No Comments Yet</p> : 
        <div>
          {commentList.map(comment => (
            <ProfileComment key={comment.id} {...props} comment={comment} userId={userId} />
          ))}
        </div>
      }
      <ProfileCommentForm {...props} userId={userId} />
    </div>
  )
}

export default ProfileCommentView