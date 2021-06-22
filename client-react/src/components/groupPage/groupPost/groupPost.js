import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GroupCommentView from './groupCommentView/groupCommentView'
import EditGroupPostForm from '../../forms/editGroupPostForm/editGroupPostForm'

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

  return (
    <div className='main-post-wrapper'>
      <div className='post-detail'>
        <div className='userName'>
          <h3>{post.author.userName}</h3>
        </div>

        <div>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <div style={editModal ? {display: 'block'} : {display: 'none'}}>
            <EditGroupPostForm groupId={selectedGroup.groupId} {...props} setEditModal={setEditModal} post={post} />
          </div>
        </div>

        <div>
          <div>
            {
              (isLoggedIn && loggedInUser.admin === 1) || (isLoggedIn && post.author.id === loggedInUser.id) || isOwner ? 
              <button onClick={() => onDeleteGroupPost({postId:post.id,groupId:selectedGroup.groupId})}>Delete</button> : null
            }
            {isLoggedIn && post.author.id === loggedInUser.id ? <button onClick={() => setEditModal(true)}>Edit</button> : null}
          </div>
          <div>
            <button onClick={() => onUpdateGroupPostVotes({
              type: 'likes',
              groupId: selectedGroup.groupId,
              postId: post.id,
              likes: likes
            })}>
              <div>Likes</div>
              <div>{likes}</div>
            </button>
            <button onClick={() => onUpdateGroupPostVotes({
              type: 'dislikes',
              groupId: selectedGroup.groupId,
              postId: post.id,
              dislikes: dislikes
            })}>
              <div>dislikes</div>
              <div>{dislikes}</div>
            </button>
            <button
              onClick={() => setView(!commentView)}
            >
              <div>Comments</div>
              <div>{commentList.length}</div>
            </button>
          </div>
        </div>
        <GroupCommentView 
          {...props} 
          commentView={commentView} 
          postId={post.id} 
          postAuthor={post.authorId} 
          groupId={selectedGroup.groupId} 
          commentList={commentList} 
        />
      </div>

      <div className='post-control'>
        <div>
          <Link onClick={() => onGetProfile(post.author.id)} to={`/profile`}>
            <button>Profile</button>
          </Link>
        </div>
        <div>
          <button>Add Friend</button>
        </div>
      </div>
    </div>
  )
}

export default GroupPost