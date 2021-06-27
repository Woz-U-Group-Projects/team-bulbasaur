import React, { useState } from 'react'
import GroupPost from '../groupPost/groupPost'
import GroupPostForm from '../../forms/groupPostForm/groupPostForm';

import './groupPostView.css';

const GroupPostView = props => {
  let { isAdmin, isMember, isOwner, groupPosts, selectedGroup } = props

  let [messageView, setMessageView] = useState(false)

  return (
    <div>
      <div className="group-post-view-control">
        <button className="link-btn" onClick={() => setMessageView(false)}>
          <h3>Posts</h3>
        </button>
        <button className="link-btn" style={isMember ? { display: 'inline' } : { display: 'none' }} onClick={() => setMessageView(true)}>
          <h3>Group Messages</h3>
        </button>
      </div>

      <div style={!messageView ? { display: 'block' } : { display: 'none' }}>
        <div style={isMember ? { display: 'block' } : { display: 'none' }}>
          <GroupPostForm {...props} group={selectedGroup} isAdmin={isAdmin} isOwner={isOwner} />
        </div>
        {groupPosts.length === 0 ? <span>No Posts Have Been Made Yet</span> : groupPosts.filter(post => post.isHidden === 0).map(post => (
          <GroupPost key={post.id} {...props} post={post} isOwner={isOwner} />
        ))}
      </div>

      <div style={messageView ? { display: 'block' } : { display: 'none' }}>
        <div style={isMember ? { display: 'block' } : { display: 'none' }}>
          <GroupPostForm {...props} group={selectedGroup} isAdmin={isAdmin} isOwner={isOwner} />
        </div>
        {groupPosts.length === 0 ? <span>No Posts Have Been Made Yet</span> : groupPosts.filter(post => post.isHidden === 1).map(post => (
          <GroupPost key={post.id} {...props} post={post} isOwner={isOwner} />
        ))}
      </div>
    </div>
  )
}

export default GroupPostView