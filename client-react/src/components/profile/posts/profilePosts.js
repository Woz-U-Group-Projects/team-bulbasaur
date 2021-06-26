import React, { useState, useEffect } from "react";
import ProfileCommentView from "./commentView/profileCommentView";
import EditProfilePostForm from "../../forms/editProfilePostForm/editProfilePostForm";

import './profilePosts.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const ProfilePosts = (props) => {
  let { post, onUpdateVotesByUserId, isLoggedIn, loggedInUser, onDeletePostByUserId, userId } = props
  let [commentList, setList] = useState([])
  let [commentView, setView] = useState(false)
  let [editModal, setEditModal] = useState(false)
  let [likes, setLikes] = useState(0)
  let [dislikes, setDislikes] = useState(0)

  useEffect(() => {
    setLikes(post.likes)
    setDislikes(post.dislikes)
    setList(post.comments)
  }, [post])

  library.add(faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  return (
    <div className="profile-posts-container">
      <div className="profile-posts-username">
        <h3>{post.author.userName}</h3>
        <div className="profile-posts-control-group">
          <div className="svg-icons">
            {isLoggedIn && post.author.id === loggedInUser.id ? <FontAwesomeIcon icon="edit" onClick={() => setEditModal(true)} /> : null}
          </div>

          <div className="svg-icons">
            {(isLoggedIn && loggedInUser.admin === 1) || (isLoggedIn && post.author.id === loggedInUser.id) ? <FontAwesomeIcon className="trash-icon" icon="trash-alt" onClick={() => onDeletePostByUserId(post.id, loggedInUser.id)} /> : null}
          </div>
        </div>
      </div>

      <div className="profile-posts-body">
        <div>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>

        <div style={editModal ? { display: 'block' } : { display: 'none' }}>
          <EditProfilePostForm {...props} setEditModal={setEditModal} post={post} userId={post.author.id} />
        </div>
        {isLoggedIn && post.author.id === loggedInUser.id ? <p>Private: {post.isHidden === 0 ? 'false' : 'true'}</p> : null}
      </div>

      <div className="profile-posts-votes">
        <div className="profile-votes">
          <div className="thumbs-up">
            <FontAwesomeIcon icon="thumbs-up" onClick={() => onUpdateVotesByUserId('likes', likes, userId, post.id)} /> <span>{likes}</span>
          </div>

          <div className="thumbs-down"> 
            <FontAwesomeIcon className="thumbs-down-icon" icon="thumbs-down" onClick={() => onUpdateVotesByUserId('dislikes', dislikes, userId, post.id)} /> 
            <div className="vote-count">{dislikes}</div>
          </div>
        </div>

        <div>
          <FontAwesomeIcon icon="comment-dots" onClick={() => setView(!commentView)} /> {commentList.length}
        </div>
      </div>
      <ProfileCommentView {...props} postId={post.id} userId={props.userId} postAuthor={post.author.id} commentView={commentView} commentList={commentList} />
    </div>
  )
}

export default ProfilePosts