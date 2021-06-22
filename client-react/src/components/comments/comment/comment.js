import React, { useEffect, useState } from 'react';
import './comment.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

const Comment = (props) => {
  let { comment, postAuthor, loggedInUser, isLoggedIn, onUpdateCommentVotes, ondeleteComment, onGetProfile } = props
  let [likes, setLikes] = useState()
  let [dislikes, setDislikes] = useState()
  let isVisible = isLoggedIn && ( comment.authorId === loggedInUser.id || postAuthor === loggedInUser.id || loggedInUser.admin === 1 )
  
  useEffect(() => {
    setDislikes(comment.dislikes)
    setLikes(comment.likes)
  }, [comment])

  library.add(faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  return (
    <div key={comment.id} className="comment-view-container">
      <div className="comment-body">
        <p>{comment.body} -</p>  
        <Link className="link-profile" onClick={() => onGetProfile(comment.author.id)} to={`/profile`}>
          <h5>{comment.author}</h5>
        </Link>
      </div>

      <div className="comment-vote-container">
        <div className="thumbs-up">
          <FontAwesomeIcon icon="thumbs-up" onClick={() => onUpdateCommentVotes('likes', likes, comment.id)} /> <span>{likes}</span>
        </div>
        
        <div className="thumbs-down">
          <FontAwesomeIcon className="thumbs-down-icon" icon="thumbs-down" onClick={() => onUpdateCommentVotes('dislikes', dislikes, comment.id)} /> <div className="vote-count">{dislikes}</div>
        </div>

        <div>
          <button
            className="comment-delete-btn"
            style={isVisible ? { display: 'block' } : { display: 'none' }}
            onClick={() => isVisible ? ondeleteComment({commentId:comment.id}) : null}
          >
            <FontAwesomeIcon className="comment-delete-icon" icon="trash-alt" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Comment