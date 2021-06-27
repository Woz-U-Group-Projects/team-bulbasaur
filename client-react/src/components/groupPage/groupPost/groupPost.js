import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GroupCommentView from './groupCommentView/groupCommentView'
import EditGroupPostForm from '../../forms/editGroupPostForm/editGroupPostForm';

import './groupPost.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const GroupPost = (props) => {
  let { post, onUpdateGroupPostVotes, isLoggedIn, loggedInUser, onDeleteGroupPost, onGetProfile, selectedGroup, isOwner } = props
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
    <div className='group-post-wrapper'>
      <div className='group-post-detail'>
        <div className='group-userName'>
          <div>
            <Link onClick={() => onGetProfile(post.author.id)} to={`/profile`}>
              <h3>{post.author.userName}</h3>
            </Link>
          </div>

          <div className='group-post-control-group'>
            <div className="svg-icons">
              <Link onClick={() => onGetProfile(post.author.id)} to={`/profile`}>
                <FontAwesomeIcon className="user-icon" icon="user" />
              </Link>
            </div>
            <div className="svg-icons">
              <FontAwesomeIcon className="user-plus-icon" icon="user-plus" />
            </div>
            <div className="svg-icons">
              {isLoggedIn && post.author.id === loggedInUser.id ? <FontAwesomeIcon icon="edit" onClick={() => setEditModal(true)} /> : null}
            </div>
            <div className="svg-icons">
              {(isLoggedIn && loggedInUser.admin === 1) || (isLoggedIn && post.author.id === loggedInUser.id) || isOwner ? <FontAwesomeIcon onClick={() => onDeleteGroupPost({ postId: post.id, groupId: selectedGroup.groupId })} className="trash-icon" icon="trash-alt" /> : null}
            </div>
          </div>
        </div>

        <div className="group-post-body-wrapper">
          <div className="group-post-body">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
          <div>
            <div style={editModal ? { display: 'block' } : { display: 'none' }}>
              <EditGroupPostForm groupId={selectedGroup.groupId} {...props} setEditModal={setEditModal} post={post} />
            </div>
          </div>
        </div>

        <div className='post-vote'>
          <div className="votes">
            <div className="thumbs-up">
              <FontAwesomeIcon icon="thumbs-up" onClick={() => onUpdateGroupPostVotes({type: 'likes', groupId: selectedGroup.groupId, postId: post.id, likes: likes})} /> 
              <span>{likes}</span>
            </div>
              <div className="thumbs-down">
                <FontAwesomeIcon className="thumbs-down-icon" icon="thumbs-down" onClick={() => onUpdateGroupPostVotes({type: 'dislikes', groupId: selectedGroup.groupId, postId: post.id,
                dislikes: dislikes})} />
              <div className="vote-count">{dislikes}</div>
            </div>
          </div>

          <div>
            <FontAwesomeIcon icon="comment-dots" onClick={() => setView(!commentView)} /> {commentList.length}
          </div>
        </div>

        <GroupCommentView {...props} commentView={commentView} postId={post.id} postAuthor={post.authorId} groupId={selectedGroup.groupId} commentList={commentList}/>
      </div>
    </div>
  )
}

export default GroupPost