import React, { useState } from 'react';

import './groupPostView.css';
import Post from '../../mainPage/post/mainPost';
import PostForm from '../../forms/postForm/postForm';

const GroupPostView = props => {
  const { selectedGroup, loggedInUser } = props;

  const [messageView, setMessageView] = useState(false);

  return (
    <div>
      <div className="group-post-view-control">
        <button className="link-btn" onClick={() => setMessageView(false)}>
          <h3>Posts</h3>
        </button>
        <button
          className="link-btn"
          style={(
            loggedInUser.userId === selectedGroup.owner.userId
            || selectedGroup.members.find(user => user.userId === loggedInUser.userId)
            || selectedGroup.admins.find(user => user.userId === loggedInUser.userId)
          ) ? { display: 'inline' } : { display: 'none' }}
          onClick={() => setMessageView(true)}
        >
          <h3>Group Messages</h3>
        </button>
      </div>

      <div style={!messageView ? { display: 'block' } : { display: 'none' }}>
        <div
          style={(
            loggedInUser.userId === selectedGroup.owner.userId
            || selectedGroup.members.find(user => user.userId === loggedInUser.userId)
            || selectedGroup.admins.find(user => user.userId === loggedInUser.userId)
          ) ? { display: 'block' } : { display: 'none' }}
        >
          <PostForm {...props} />
        </div>
        {selectedGroup.posts.filter(post => post.private === 0).length > 0 ? selectedGroup.posts.filter(post => post.private === 0).reverse().map(post => (
          <Post key={post.postId} {...props} post={post} />
        )) : <span>No Posts Have Been Made Yet</span>}
      </div>

      <div style={messageView ? { display: 'block' } : { display: 'none' }}>
        <div
          style={(
            loggedInUser.userId === selectedGroup.owner.userId
            || selectedGroup.members.find(user => user.userId === loggedInUser.userId)
            || selectedGroup.admins.find(user => user.userId === loggedInUser.userId)
          ) ? { display: 'block' } : { display: 'none' }}
        >
          <PostForm {...props} group={selectedGroup} />
        </div>
        {selectedGroup.posts.length > 0 ? selectedGroup.posts.filter(post => post.private === 1).reverse().map(post => (
          <Post key={post.postId} {...props} post={post} />
        )) : <span>No Messages Have Been Made Yet</span>}
      </div>
    </div>
  )
}

export default GroupPostView