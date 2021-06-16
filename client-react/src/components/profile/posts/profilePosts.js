import React, { useState, useEffect } from "react";
import ProfileCommentView from "./commentView/profileCommentView";
import EditProfilePostForm from "../../forms/editProfilePostForm/editProfilePostForm";

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

  return (
    <div style={{ margin: 20, borderWidth: 2, borderColor: 'black', borderStyle: 'solid' }}>
      <div style={{ borderWidth: 2, borderColor: 'black', borderStyle: 'solid' }}>
        <h3>{post.author.userName}</h3>
      </div>
      <div>
        <h4>{post.title}</h4>
        <p>{post.body}</p>
        {post.edit === null ? null : <p><span>Edit:</span> {post.edit}</p>}
        <div style={editModal ? { display: 'block' } : { display: 'none' }}>
          <EditProfilePostForm {...props} setEditModal={setEditModal} post={post} userId={post.author.id} />
        </div>
        {isLoggedIn && post.author.id === loggedInUser.id ? <p>Private: {post.isHidden === 0 ? 'false' : 'true'}</p> : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {(isLoggedIn && loggedInUser.admin === 1) || (isLoggedIn && post.author.id === loggedInUser.id) ? 
            <button onClick={() => onDeletePostByUserId(post.id, loggedInUser.id)}>Delete</button> : 
          null}

          {isLoggedIn && post.author.id === loggedInUser.id ? 
            <button onClick={() => setEditModal(true)}>Edit</button> : 
          null}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <button onClick={() => onUpdateVotesByUserId('likes', likes, userId, post.id)}>
            <div>Likes</div>
            <div>{likes}</div>
          </button>
          <button onClick={() => onUpdateVotesByUserId('dislikes', dislikes, userId, post.id)}>
            <div>dislikes</div>
            <div>{dislikes}</div>
          </button>
          <button
            onClick={() => {
              console.log('yes')
              setView(!commentView)
            }}
          >
            <div>Comments</div>
            <div>{commentList.length}</div>
          </button>
        </div>
      </div>
      <ProfileCommentView {...props} postId={post.id} userId={props.userId} postAuthor={post.author.id} commentView={commentView} commentList={commentList} />
    </div>
  )
}

export default ProfilePosts