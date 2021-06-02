import React, { useEffect, useState } from 'react'
import Post from './post'

const MainPage = ({ posts, onGetPosts, onUpdateVotes }) => {
  let [postList, setList] = useState([])

  useEffect(() => {
    onGetPosts()
  }, [onGetPosts])

  useEffect( () => {
    setList(posts)
  },[posts])

  return (
    <div>
      <div>
        {/* <UserList/> */}
      </div>
      <div>
        {postList.length === 0 ? <p>no posts have been made yet</p> : postList.map(post => {
          return <Post key={post.id} post={post} onUpdateVotes={onUpdateVotes}  />
        })}
      </div>
    </div>
  )
}

export default MainPage