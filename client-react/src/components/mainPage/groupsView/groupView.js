import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateGroupForm from '../../forms/createGroupForm/createGroupFrom'

import './groupView.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const GroupView = (props) => {
  const { groups, isLoggedIn, onGetGroupPage, onJoinGroup, loggedInUser } = props
  const [groupFormView, setFormView] = useState(false);

  library.add(faPlus);

  return (
    <div className="groupview-container">
      <div style={groupFormView ? { display: 'block' } : { display: 'none' }}>
        <CreateGroupForm {...props} setFormView={setFormView} />
      </div>
      <div className="group-add">
        <h1>Popular Groups</h1>
        <FontAwesomeIcon
          className="add-icon"
          icon="plus"
          onClick={() => isLoggedIn ? setFormView(true) : alert('you must be logged in to create a new group')}
        />
      </div>

      <div >
        {groups.length === 0 ? null : groups.map(group => {
          return (

            <div key={group.groupId} className="group-card">
              <Link
                onClick={() => onGetGroupPage(group.groupId)}
                style={{ textDecoration: 'none' }}
                to='/groupPage'
              >
                <div className="group-name">
                  <div>
                    <h3>{group.groupName}</h3>
                  </div>
                  <div>
                    <p>Members: {group.members.length}</p>
                  </div>
                </div>

                <div className="group-vote-main">
                  <div className="group-vote">
                    <span>{parseInt(group.likes)}</span> Likes
                  </div>
                  <div className="group-vote">
                    <span>{parseInt(group.dislikes)}</span> Dislikes
                  </div>
                </div>
              </Link>
              <button
                style={
                  (
                    loggedInUser &&
                    (
                      loggedInUser.userId === group.owner.userId
                      || group.members.find(user => user.userId === loggedInUser.userId)
                      || group.admins.find(user => user.userId === loggedInUser.userId)
                    )
                  )
                    ? { display: 'none' }
                    : { display: 'block' }
                }
                onClick={() => isLoggedIn ? onJoinGroup(group.groupId) : alert('you must login to join a group')}
              >
                Join
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GroupView