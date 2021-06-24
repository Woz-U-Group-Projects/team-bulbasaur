import React, { useState } from 'react'

const User = props => {
  let {
    user, loggedInUser, onAddFriend, isOwner, onTransferGroupOwner, selectedGroup, onRemoveUser, onRemoveGroupAdmin,
    onMakeGroupAdmin
  } = props

  let [isFriend, checkFreindShip] = useState(false)
  console.log("log",loggedInUser?loggedInUser.friends.filter(user => user.relationShip.recieverId === user.id).length > 0:undefined)

  return (
    <div>
      <div>
        <h3>{user.userName}</h3>
        <button>options</button>
      </div>
      <div>
        <div>
          <button
            style={
              loggedInUser && ((loggedInUser.id === user.id) || (loggedInUser.friends.filter(user => user.relationShip.recieverId === user.id).length === 0)) ?
                { display: 'none' } : { display: 'inline' }
            }
            onClick={() => onAddFriend(user.id)}
          >Add Friend</button>
        </div>
        <div>
          <button
            onClick={() => onRemoveUser({ userId: user.id, groupId: selectedGroup.groupId })}
          >Remove</button>
          <button
            onClick={() => onRemoveGroupAdmin({ userId: user.id, groupId: selectedGroup.groupId })}
            style={user.membership === 'Admin' && isOwner ? { display: 'inline' } : { display: 'none' }}
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
  )
}

export default User