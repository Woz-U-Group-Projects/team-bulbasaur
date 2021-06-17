import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CommentView from '../../comments/commentView/comments'
import EditPostForm from '../../forms/editPostForm/editPostForm'
import './mainPost.css'

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
    <div className='main-post-wrapper'>
      <div className='post-detail'>
        <div className='userName'>
          <h3>{post.author.userName}</h3>
        </div>

        <div>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <div style={editModal ? {display: 'block'} : {display: 'none'}}>
            <EditPostForm {...props} setEditModal={setEditModal} post={post} />
          </div>
          {isLoggedIn && post.author.id === loggedInUser.id ? <p>Private: {post.isHidden === 0 ? 'false' : 'true'}</p> : null}
        </div>

        <div>
          <div>
            {(isLoggedIn && loggedInUser.admin === 1) || (isLoggedIn && post.author.id === loggedInUser.id) ? <button onClick={() => onDeletePost(post.id)}>Delete</button> : null}
            {isLoggedIn && post.author.id === loggedInUser.id ? <button onClick={() => setEditModal(true)}>Edit</button> : null}
          </div>
          <div>
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

export default Post