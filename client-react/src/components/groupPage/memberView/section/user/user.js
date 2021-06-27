import React, { useEffect, useState } from 'react'

import './user.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const User = props => {
  let {
    user, loggedInUser, onAddFriend, onTransferGroupOwner, selectedGroup, onRemoveUser, 
    onRemoveGroupAdmin, onMakeGroupAdmin, isAdmin, isOwner
  } = props

  library.add(faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  let [isFriend, checkFreindShip] = useState(false)
  let [buttonView, setButtonView] = useState(false)
  
  useEffect(() => {
    checkFreindShip(loggedInUser?loggedInUser.friends.filter(friend => friend.id === user.id ).length>0?true:false:false)
    setButtonView(false)
  }, [loggedInUser, user])

  return (
    <div>
      <div className="owner-group-section">
        <div>
          <h3>{user.userName}</h3>
        </div>

        <div className="group-members-control-btn">
          <div style={buttonView?{display:'block'}:{display:'inline'}}>
            <button onClick={()=>setButtonView(prevView => !prevView)}>options</button>
            <button
              style={
                loggedInUser && ((loggedInUser.id === user.id) || isFriend )?
                { display: 'none' } : { display: 'inline' }
              }
              onClick={() => onAddFriend({recieverId:user.id})}
              >Add Friend</button>
            <button
              style={isOwner&&isAdmin?{display:'inline'}:{display:'none'}}
              onClick={() => onRemoveUser({ userId: user.id, groupId: selectedGroup.groupId })}
              >Remove</button>
            <button
              style={user.membership === 'Admin' && isOwner ? { display: 'inline' } : { display: 'none' }}
              onClick={() => onRemoveGroupAdmin({ userId: user.id, groupId: selectedGroup.groupId })}
              >Make Member</button>
            <button
              onClick={() => onTransferGroupOwner({ userId: user.id, groupId: selectedGroup.groupId })}
              style={user.membership === 'Admin' && isOwner ? { display: 'inline' } : { display: 'none' }}
              >Make Owner</button>
            <button
              onClick={() => onMakeGroupAdmin({ userId: user.id, groupId: selectedGroup.groupId })}
              style={user.membership === 'Member' && isOwner ? { display: 'inline' } : { display: 'none' }}
              >Make Admin</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default User