import React, { useEffect, useState } from 'react'

const User = props => {
  let {
    user, loggedInUser, onAddFriend, onTransferGroupOwner, selectedGroup, onRemoveUser, 
    onRemoveGroupAdmin, onMakeGroupAdmin, isAdmin, isOwner
  } = props

  let [isFriend, checkFreindShip] = useState(false)
  let [buttonView, setButtonView] = useState(false)
  
  useEffect(() => {
    checkFreindShip(loggedInUser?loggedInUser.friends.filter(friend => friend.id === user.id ).length>0?true:false:false)
    setButtonView(false)
  }, [loggedInUser, user])

  return (
    <div>
      <div>
        <h3>{user.userName}</h3>
        <button onClick={()=>setButtonView(prevView => !prevView)}>options</button>
      </div>
      <div style={buttonView?{display:'block'}:{display:'inline'}}>
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