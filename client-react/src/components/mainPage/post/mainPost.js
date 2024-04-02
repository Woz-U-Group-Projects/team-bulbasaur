import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CommentView from '../../comments/commentView/comments'
import EditPostForm from '../../forms/editPostForm/editPostForm'
import './mainPost.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const Post = (props) => {
  const { post, onUpdateVotes, isLoggedIn, loggedInUser, onDeletePost, onGetProfile, onAddFriend } = props
  const [commentList, setList] = useState([])
  const [commentView, setView] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)

  useEffect(() => {
    setLikes(post.likes)
    setDislikes(post.dislikes)
    setList(post.comments ?? [])
  }, [post])

  library.add(faUser, faUsers, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  return (
    <div
      className='main-post-wrapper'
      style={post.author.blocked.find(user => user.userId === loggedInUser.userId) ? { display: 'none' } : { display: 'block' }}
    >
      <div className='post-detail'>
        {/* User Info/Controls */}
        <div className='userName'>
          {/* User Info */}
          <div className="user-profile">
            <h3>{post.author.userName}</h3>
          </div>

          {/* User Controls */}
          <div className='control-group'>
            {/* To Profile Icon */}
            <div className="svg-icons">
              {
                isLoggedIn && loggedInUser.userId !== post.author.userId ?
                  <Link onClick={() => onGetProfile(post.author.userId)} to={`/profile`}>
                    <FontAwesomeIcon className="user-icon" icon="user" />
                  </Link>
                  : null
              }
            </div>
            {/* Add Friend Icon */}
            <div className="svg-icons">
              {
                (
                  isLoggedIn
                  && loggedInUser.userId !== post.author.userId
                  && !loggedInUser.denied.find(user => user.userId === post.author.userId)
                  && !loggedInUser.friends.find(u => u.userId === post.author.userId)
                  && !loggedInUser.incoming.find(u => u.userId === post.author.userId)
                  && !loggedInUser.outgoing.find(u => u.userId === post.author.userId)
                ) ? (
                  <FontAwesomeIcon
                    onClick={() => onAddFriend(post.author.userId)}
                    className="user-plus-icon" icon="user-plus"
                  />
                ) : null
              }
            </div>
            {/* Edit Icon */}
            <div className="svg-icons">
              {
                (isLoggedIn && post.author.userId === loggedInUser.userId) ?
                  <FontAwesomeIcon icon="edit" onClick={() => setEditModal(true)} />
                  : null
              }
            </div>
            {/* Delete Icon */}
            <div className="svg-icons">
              {
                (isLoggedIn && loggedInUser.admin === 1) || (isLoggedIn && post.author.userId === loggedInUser.userId) ?
                  <FontAwesomeIcon className="trash-icon" icon="trash-alt" onClick={() => onDeletePost(post.postId)} />
                  : null
              }
            </div>
          </div>
        </div>

        {/* Post Body */}
        <div className='post-body-wrapper'>
          <div className="post-body" >
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>

          <div style={editModal ? { display: 'block' } : { display: 'none' }}>
            <EditPostForm {...props} setEditModal={setEditModal} post={post} />
          </div>

          {/* Private Flag */}
          <div>
            {
              isLoggedIn && post.author.userId === loggedInUser.userId ?
                <p>Private: {post.private === 0 ? 'false' : 'true'}</p>
                : null
            }
          </div>
        </div>

        {/* Interactions */}
        <div className='post-vote'>
          {/* Reaction Icons/Counts */}
          <div className="votes">
            {/* Likes Icon/Count */}
            <div className="thumbs-up">
              <FontAwesomeIcon
                icon="thumbs-up"
                onClick={() => onUpdateVotes('likes', likes, post.postId)}
              />
              <span>{post.likes}</span>
            </div>
            {/* Dislikes Icon/Counts */}
            <div className="thumbs-down">
              <FontAwesomeIcon
                className="thumbs-down-icon" icon="thumbs-down"
                onClick={() => onUpdateVotes('dislikes', dislikes, post.postId)}
              />
              <span className="vote-count">{dislikes}</span>
            </div>
          </div>

          {/* Comment Icon/Count */}
          <div>
            <FontAwesomeIcon
              className="main-post-comment-icon"
              icon="comment-dots"
              onClick={() => setView(!commentView)}
            />
            <span>{commentList.length}</span>
          </div>
        </div>

        {/* Comment Section */}
        <CommentView
          {...props}
          commentView={commentView}
          postId={post.postId}
          postAuthor={post.author.userId}
          commentList={commentList}
        />
      </div>
    </div >
  )
}

export default Post