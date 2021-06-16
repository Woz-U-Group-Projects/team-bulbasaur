import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CommentView from '../../comments/commentView/comments'
import EditPostForm from '../../forms/editPostForm/editPostForm'

const Post = (props) => {
  let { post, onUpdateVotes, isLoggedIn, loggedInUser, onDeletePost, onGetProfile } = props
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
        <Link 
          onClick={() => onGetProfile(post.author.id)} 
          to={`/profile`} 
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <h3>{post.author.userName}</h3>
        </Link>
      </div>
      <div>
        <h4>{post.title}</h4>
        <p>{post.body}</p>
        <div style={editModal ? { display: 'block' } : { display: 'none' }}>
          <EditPostForm {...props} setEditModal={setEditModal} post={post} />
        </div>
        {isLoggedIn && post.author.id === loggedInUser.id ? <p>Private: {post.isHidden === 0 ? 'false' : 'true'}</p> : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {(isLoggedIn && loggedInUser.admin === 1) || (isLoggedIn && post.authorId === loggedInUser.id) ? <button onClick={() => onDeletePost(post.id)}>Delete</button> : null}
          {isLoggedIn && post.author.id === loggedInUser.id ? <button onClick={() => {setEditModal(true)}}>Edit</button> : null}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <button onClick={() => onUpdateVotes('likes', likes, post.id)}>
            <div>Likes</div>
            <div>{likes}</div>
          </button>
          <button onClick={() => onUpdateVotes('dislikes', dislikes, post.id)}>
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
      <CommentView {...props} commentView={commentView} postId={post.id} postAuthor={post.authorId} commentList={commentList} />
    </div>
  )
}

export default Post