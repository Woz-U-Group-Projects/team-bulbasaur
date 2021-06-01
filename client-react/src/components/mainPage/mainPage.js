import React, { useEffect } from 'react'
import Post from './post'

const MainPage = ({ posts, onGetPosts }) => {
  let updates = []
  const setNewPosts = (object) => {
    console.log('start')
    console.log('object', object)
    if (updates.length === 0) {
      console.log('true')
      updates.push(object)
    } else {
      console.log('false')
      let found = updates.filter(update => update.postId === object.postId)
      if (found.length === 0) {
        updates.push(object)
      } else {
        let index = updates.findIndex( update => update.postId === object.postId )
        updates.splice(index, 1, object)
      }
    }
    console.log(updates)
  }

  useEffect(() => {
    onGetPosts()
    return () => console.log('main unmount')
  }, [])

  return (
    <div>
      {posts.length === 0 ? <p>no posts have been made yet</p> : posts.map(post => {
        return <Post key={post.id} post={post} set={setNewPosts} />
      })}
    </div>
  )
}

export default MainPage