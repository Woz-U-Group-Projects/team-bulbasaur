
import './index.css';

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import CommentView from '../../comments/commentView/comments'
// import EditPostForm from '../../forms/editPostForm/editPostForm'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const Post = ({ loggedIn, editingPost, user, post }) => {
  library.add(faUser, faUsers, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  const [isPostAuthor] = useState(post && user && post.author.userId === user.userId);

  return (
    <div className='main-post-wrapper'>
      <div className='post-detail'>
        <div className='userName'>
          <div className="user-profile">
            <h3>{post.author.userName}</h3>
          </div>
          <div className='control-group'>
            <div className="svg-icons">
              {
                loggedIn && !isPostAuthor ?
                  // <Link onClick={() => onGetProfile(post.author.userId)} to={`/profile`}>
                  <FontAwesomeIcon className="user-icon" icon="user" />
                  // </Link>
                  : null
              }
            </div>
            <div className="svg-icons">
              {
                loggedIn && !isPostAuthor ?
                  <FontAwesomeIcon
                    // onClick={() => onAddFriend({ recieverId: post.author.userId })}
                    className="user-plus-icon" icon="user-plus"
                  />
                  : null
              }
            </div>
            <div className="svg-icons">
              {
                (loggedIn && isPostAuthor) ?
                  <FontAwesomeIcon
                    icon="edit"
                  // onClick={() => setEditModal(true)}
                  />
                  : null
              }
            </div>
            <div className="svg-icons">
              {
                loggedIn && (!isPostAuthor || user.admin) ?
                  <FontAwesomeIcon
                    className="trash-icon" icon="trash-alt"
                  // onClick={() => onDeletePost(post.postId)}
                  />
                  : null
              }
            </div>
          </div>
        </div>

        <div className='post-body-wrapper'>
          <div className="post-body" >
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
          <div style={editingPost ? { display: 'block' } : { display: 'none' }}>
            {/* <EditPostForm {...props} setEditModal={setEditModal} post={post} /> */}
          </div>
          <div>
            {
              loggedIn && isPostAuthor ?
                <p>Private: {post.private === 0 ? 'false' : 'true'}</p>
                : null
            }
          </div>
        </div>

        <div className='post-vote'>
          <div className="votes">
            <div className="thumbs-up">
              <FontAwesomeIcon
                icon="thumbs-up"
                // onClick={() => onUpdateVotes('likes', likes, post.id)}
              />
              <span>{parseInt(post.likes)}</span>
            </div>
            <div className="thumbs-down">
              <FontAwesomeIcon
                className="thumbs-down-icon" icon="thumbs-down"
                // onClick={() => onUpdateVotes('dislikes', dislikes, post.id)}
              />
              <div className="vote-count">{parseInt(post.dislikes)}</div>
            </div>
          </div>

          <div>
            <FontAwesomeIcon
              className="main-post-comment-icon"
              icon="comment-dots"
              // onClick={() => setView(!commentView)}
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        {/* <CommentView
          {...props}
          commentView={commentView}
          postId={post.postId}
          postAuthor={post.author.userId}
          commentList={commentList}
        /> */}
      </div>
    </div>
  )
}

export default Post;
