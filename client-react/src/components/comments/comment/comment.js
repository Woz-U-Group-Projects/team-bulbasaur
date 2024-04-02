import React, { useEffect, useState } from 'react';
import './comment.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

const Comment = (props) => {
  let { comment, postAuthor, loggedInUser, isLoggedIn, onUpdateCommentVotes, onDeleteComment, onGetProfile } = props
  let [likes, setLikes] = useState(0)
  let [dislikes, setDislikes] = useState(0)
  let isVisible = isLoggedIn && (comment.author.userId === loggedInUser.userId || postAuthor === loggedInUser.userId || loggedInUser.admin === 1)

  useEffect(() => {
    setDislikes(comment.dislikes)
    setLikes(comment.likes)
  }, [comment])

  library.add(faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  return (
    <div key={comment.id} className="comment-view-container">
      {/* Comment Body */}
      <div className="comment-body">
        <p>{comment.body} -</p>
        <Link className="link-profile" onClick={() => onGetProfile(comment.author.userId)} to={`/profile`}>
          <h5>{comment.author.userName}</h5>
        </Link>
      </div>

      {/* Interaction Panel */}
      <div className="comment-vote-container">
        {/* Likes Icon/Count */}
        <div className="thumbs-up">
          <FontAwesomeIcon
            icon="thumbs-up"
            onClick={() => onUpdateCommentVotes('likes', likes, comment.commentId)}
          />
          <span>{likes}</span>
        </div>

        {/* Dislikes Icon/Count */}
        <div className="thumbs-down">
          <FontAwesomeIcon
            className="thumbs-down-icon" icon="thumbs-down"
            onClick={() => onUpdateCommentVotes('dislikes', dislikes, comment.commentId)}
          />
          <div className="vote-count">{dislikes}</div>
        </div>

        {/* Delete Icon */}
        <div>
          <button
            className="comment-delete-btn"
            style={isVisible ? { display: 'block' } : { display: 'none' }}
            onClick={() => isVisible ? onDeleteComment({ commentId: comment.commentId, postId: comment.postId }) : null}
          >
            <FontAwesomeIcon className="comment-delete-icon" icon="trash-alt" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Comment;
