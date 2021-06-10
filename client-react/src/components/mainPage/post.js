import React, { useEffect, useState } from 'react'
import CommentView from '../comments/comments'

const Post = (props) => {
  let { post, onUpdateVotes, isLoggedIn, loggedInUser, onDeletePost } = props
  let [commentList, setList] = useState([])
  let [commentView, setView] = useState(false)
  let [likes, setLikes] = useState(0)
  let [dislikes, setDislikes] = useState(0)

  useEffect(() => {
    setLikes(post.likes)
    setDislikes(post.dislikes)
    setList(post.comments)
  }, [post])

  return (
    <div style={{margin: 20, borderWidth: 2, borderColor: 'black', borderStyle: 'solid'}}>
      <div style={{borderWidth: 2, borderColor: 'black', borderStyle: 'solid'}}>
        <h3>{post.author}</h3>
        {(isLoggedIn && loggedInUser.admin === 1)||(isLoggedIn && post.authorId === loggedInUser.id) ? <button onClick={()=>onDeletePost(post.id)}>Delete</button> : null}
      </div>
      <div>
        <h4>{post.title}</h4>
        <p>{post.body}</p>
        {(isLoggedIn && post.authorId === loggedInUser.id) ? <p>Private: {post.isHidden === 0 ? 'false' : 'true'}</p> : null}
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <button onClick={() => onUpdateVotes('likes', likes, post.id)}>
          <div>Likes</div>
          <div>{likes}</div>
        </button>
        <button onClick={() => onUpdateVotes('dislikes', dislikes, post.id)}>
          <div>dislikes</div>
          <div>{dislikes}</div>
        </button>
        <button
          style={commentList.length === 0 ? { display: 'none' } : { display: 'block' }}
          onClick={() => setView(!commentView)}
        >
          Comments
        </button>
      </div>
      <CommentView {...props} commentView={commentView} postId={post.id} commentList={commentList} />
    </div>
  )
}

export default Post