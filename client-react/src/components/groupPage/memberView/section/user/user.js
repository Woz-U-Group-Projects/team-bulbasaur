import React, { useEffect, useState } from 'react'

const User = props => {
  let {
    user, loggedInUser, onAddFriend, onTransferGroupOwner, selectedGroup, onRemoveUser, 
    onRemoveGroupAdmin, onMakeGroupAdmin
  } = props

  let [isOwner, checkOwner] = useState(false)
  let [isAdmin, checkAdmin] = useState(false)
  let [isMember, setMembership] = useState(false)

  let [isFriend, checkFreindShip] = useState(false)
  
  useEffect(() => {
    checkFreindShip(loggedInUser?loggedInUser.friends.filter(friend => friend.id === user.id ).length>0?true:false:false)
  }, [loggedInUser, user])

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
              loggedInUser && ((loggedInUser.id === user.id) || isFriend )?
                { display: 'none' } : { display: 'inline' }
            }
            onClick={() => onAddFriend({recieverId:user.id})}
          >Add Friend</button>
        </div>
        <div>
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
  )
}

export default User