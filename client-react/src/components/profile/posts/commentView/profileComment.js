import React, { useEffect, useState } from 'react';

import './profileComment.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const ProfileComment = (props) => {
  let { comment, postAuthor, loggedInUser, isLoggedIn, onUpdateCommentVotesByUserId, userId, ondeleteCommentByUserId } = props
  let [likes, setLikes] = useState()
  let [dislikes, setDislikes] = useState()
  let isVisible = isLoggedIn && (comment.authorId === loggedInUser.id || postAuthor === loggedInUser.id || loggedInUser.admin === 1)

  useEffect(() => {
    setDislikes(comment.dislikes)
    setLikes(comment.likes)
  }, [comment])

  library.add(faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  return (
    <div key={comment.id} className="comment-view-container">
      <div className="comment-body">
        <p>{comment.body} -</p>
        <h5>{comment.author}</h5>
      </div>

      <div className="comment-vote-container">
        <div className="thumbs-up">
          <FontAwesomeIcon icon="thumbs-up" onClick={() => onUpdateCommentVotesByUserId({type:'likes',current:likes,commentId:comment.id,userId:userId})} /> <span>{likes}</span>
        </div>

        <div className="thumbs-down">
          <FontAwesomeIcon className="thumbs-down-icon" icon="thumbs-down" onClick={() => onUpdateCommentVotesByUserId({type:'dislikes',current:dislikes,commentId:comment.id,userId:userId})} /> <div className="vote-count">{dislikes}</div>
        </div>

        <div>
          <button
            className="comment-delete-btn"
            style={isVisible ? { display: 'block' } : { display: 'none' }}
            onClick={() => ondeleteCommentByUserId({commentId:comment.id,userId:userId})}
          >
            <FontAwesomeIcon className="comment-delete-icon" icon="trash-alt" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileComment