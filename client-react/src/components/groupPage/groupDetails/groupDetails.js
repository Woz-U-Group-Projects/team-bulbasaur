import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import EditGroupDescription from '../../forms/editGroupDescription/editGroupDescription';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './groupDetails.css';

const GroupDetails = props => {
  const {
    selectedGroup, onUpdateGroupVotes, onJoinGroup, onRemoveUser, onDeleteGroup, loggedInUser, isLoggedIn
  } = props

  const [formView, setView] = useState(false)

  library.add(faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  return (
    <div className='group-owner-container'>
      <div className='owner-info'>
        <h1>{selectedGroup.groupName}</h1><br />
        <div>
          <h3>Owner: <span>{selectedGroup.owner.userName}</span></h3>

          {/* control buttons */}
          <div className="group-vote-btn">
            {/* vote buttons/count */}
            <div className="group-vote-button">
              <div className="thumbs-up-button">
                <FontAwesomeIcon icon="thumbs-up" onClick={() => onUpdateGroupVotes({ type: 'likes', likes: selectedGroup.likes, groupId: selectedGroup.groupId })} />
                <span>{selectedGroup.likes}</span>
              </div>

              <div className="thumbs-down">
                <FontAwesomeIcon
                  icon="thumbs-down"
                  className="thumbs-down-icon"
                  onClick={() => onUpdateGroupVotes({ type: 'dislikes', dislikes: selectedGroup.dislikes, groupId: selectedGroup.groupId })}
                />
                <span>{selectedGroup.dislikes}</span>
              </div>
            </div>

            {/* membership buttons */}
            <div>
              <button className="group-button-join"
                onClick={isLoggedIn ? () => onJoinGroup(selectedGroup.groupId) : () => alert('Must Be Logged In To Join A Group')}
                style={(
                  loggedInUser.userId === selectedGroup.owner.userId
                  || selectedGroup.members.find(user => user.userId === loggedInUser.userId) 
                  || selectedGroup.admins.find(user => user.userId === loggedInUser.userId)
                ) ? { display: 'none' } : { display: 'inline' }}
              >
                Join
              </button>
              <button className="group-button-leave"
                onClick={() => onRemoveUser({ userId: loggedInUser.userId, groupId: selectedGroup.groupId })}
                style={selectedGroup.members.find(user => user.userId === loggedInUser.userId) ? { display: 'inline' } : { display: 'none' }}
              >
                Leave
              </button>
              <Link
                to='/' 
                className="group-button-disband"
                onClick={() => onDeleteGroup(selectedGroup.groupId)}
                style={loggedInUser && loggedInUser.userId === selectedGroup.owner.userId ? { display: 'inline' } : { display: 'none' }}
              >
                Disband
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='group-description'>
        <div className="group-owner-description">
          <div style={formView ? { display: 'none' } : { display: 'block' }}>
            <h3>Description</h3>
            <div className="description-view">
              <p>{selectedGroup.description}</p>
            </div>
          </div>
          <div style={formView && loggedInUser.userId === selectedGroup.owner.userId ? { display: 'block' } : { display: 'none' }}>
            <EditGroupDescription {...props} group={selectedGroup} setView={setView} />
          </div>

          <div className="group-button-description">
            <button
              style={!formView && loggedInUser.userId === selectedGroup.owner.userId ? { display: 'block' } : { display: 'none' }}
              onClick={() => setView(true)}
            >
              Edit Description
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupDetails