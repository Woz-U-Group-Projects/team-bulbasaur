import React, { useEffect, useState } from 'react'
import CommentView from '../comments/comments'

const Post = (props) => {
  let { post, onUpdateVotes, isLoggedIn, loggedInUser } = props
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
    <div>
      <div>
        <h3>{post.author}</h3>
        {isLoggedIn ?
          loggedInUser.id === post.authorId ? <button>Delete</button> : null
          : null}
      </div>
      <div>
        <h4>{post.title}</h4>
        <p>{post.body}</p>
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
          style={commentList.length === 0 ? { display: 'none' } : { display: 'block' }}
          onClick={() => setView(!commentView)}
        >
          See {commentView === false ? 'More' : 'Less'} Comments
        </button>
      </div>
      <CommentView {...props} commentView={commentView} postId={post.id} commentList={commentList} />
    </div>
  )
}

export default Post