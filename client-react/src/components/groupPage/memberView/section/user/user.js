import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './user.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const User = props => {
  const {
    user, loggedInUser, onAddFriend, onTransferOwnership, selectedGroup, onRemoveUser,
    onPromoteUser, onDemoteUser
  } = props

  library.add(faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  const [buttonView, setButtonView] = useState(false)

  useEffect(() => {
    setButtonView(false)
  }, [loggedInUser, user])

  return (
    <div>
      <div className="owner-group-section">
        <div>
          <h3>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/profile/${user.userId}`} onClick={() => { }}>
              <FontAwesomeIcon icon="user" />
              <span style={{ marginLeft: '10px' }}>{user.userName}</span>
            </Link>
          </h3>
        </div>

        <div className="group-members-control-btn">
          <button
            style={(
              (
                user.userId !== loggedInUser.userId &&
                (
                  loggedInUser.userId === selectedGroup.owner.userId ||
                  (
                    selectedGroup.admins.find(admin => admin.userId === loggedInUser.userId)
                    && user.userId !== selectedGroup.owner.userId
                    && !selectedGroup.admins.find(admin => admin.userId === user.userId)
                  )
                )
              )
            ) ? { display: 'inline' } : { display: 'none' }}
            onClick={() => setButtonView(prevView => !prevView)}
          >
            options
          </button>
          <div style={(buttonView) ? { display: 'block' } : { display: 'none' }}>
            <div className="modal">
              <div className="button-option-wrapper">
                <button
                  style={(
                    loggedInUser
                    && (loggedInUser.userId !== user.userId)
                    && !loggedInUser.denied.find(u => u.userId === user.userId)
                    && !loggedInUser.friends.find(u => u.userId === user.userId)
                    && !loggedInUser.incoming.find(u => u.userId === user.userId)
                    && !loggedInUser.outgoing.find(u => u.userId === user.userId)
                  ) ? { display: 'inline' } : { display: 'none' }}
                  onClick={() => onAddFriend(user.userId)}
                >
                  <span>Add Friend</span>
                  <FontAwesomeIcon icon="user-plus" />
                </button>
                <button
                  style={(
                    loggedInUser && (
                      loggedInUser.userId === selectedGroup.owner.userId ||
                      selectedGroup.admins.find(admin => admin.userId === loggedInUser.userId)
                    )
                  ) ? { display: 'inline' } : { display: 'none' }}
                  onClick={() => onRemoveUser({ userId: user.userId, groupId: selectedGroup.groupId })}
                >
                  <span>Remove Member</span>
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
                <button
                  style={(
                    selectedGroup.admins.find(admin => admin.userId === user.userId)
                    && loggedInUser.userId === selectedGroup.owner.userId
                  ) ? { display: 'inline' } : { display: 'none' }}
                  onClick={() => onDemoteUser({ userId: user.userId, groupId: selectedGroup.groupId })}
                >
                  <span>Remove Admin</span>
                  <FontAwesomeIcon icon="edit" />
                </button>
                <button
                  onClick={() => onPromoteUser({ userId: user.userId, groupId: selectedGroup.groupId })}
                  style={(
                    !selectedGroup.admins.find(admin => admin.userId === user.userId)
                    && loggedInUser.userId === selectedGroup.owner.userId
                  ) ? { display: 'inline' } : { display: 'none' }}
                >
                  <span>Make Admin</span>
                  <FontAwesomeIcon icon="edit" />
                </button>
                <button
                  onClick={() => onTransferOwnership({ userId: user.userId, groupId: selectedGroup.groupId })}
                  style={(
                    selectedGroup.admins.find(admin => admin.userId === user.userId)
                    && loggedInUser.userId === selectedGroup.owner.userId
                  ) ? { display: 'inline' } : { display: 'none' }}
                >
                  Make Owner
                </button>
                <button onClick={() => setButtonView(prevView => !prevView)}>Quit</button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default User