import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateGroupForm from '../../forms/createGroupForm/createGroupFrom'

const GroupView = (props) => {
  let { groups, loggedInUser, onJoinGroup, isLoggedIn, onGetGroupPage } = props
  let [groupFormView, setFormView] = useState(false)
  return (
    <div>
      <div style={groupFormView ? { display: 'block' } : { display: 'none' }}>
        <CreateGroupForm {...props} setFormView={setFormView} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h3>Popular Groups</h3>
        <button
          onClick={() => isLoggedIn ? setFormView(true) : alert('you must be logged in to create a new group')}
        >
          Create New Group
        </button>
      </div>
      <div>
        {groups.length === 0 ? null : groups.map(group => (
          <div key={group.groupId}>
            <Link 
              onClick={() => onGetGroupPage(group.groupId)}
              style={{textDecoration:'none'}} 
              to='/groupPage'
            >
              <h4>{group.groupName}</h4>
            </Link>
            <h4># of Users: {group.users.length}</h4>
            <div>
              <button>
                <div>Likes</div>
                <div>{group.likes}</div>
              </button>
              <button>
                <div>Dislikes</div>
                <div>{group.dislikes}</div>
              </button>
              <button onClick={() => {
                isLoggedIn ? onJoinGroup({ groupId: group.groupId, userId: isLoggedIn ? loggedInUser.id : null }) : alert('you must login to join a group')
              }}>
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupView