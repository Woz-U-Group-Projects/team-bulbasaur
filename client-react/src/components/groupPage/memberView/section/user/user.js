import React, { useEffect, useState } from 'react'

const User = props => {
  let {
    user, loggedInUser, onAddFriend, onTransferGroupOwner, selectedGroup, onRemoveUser,
    onRemoveGroupAdmin, onMakeGroupAdmin, isAdmin, isOwner, isLoggedIn
  } = props

  let [isFriend, checkFreindShip] = useState(false)
  let [buttonView, setButtonView] = useState(false)

  useEffect(() => {
    checkFreindShip(loggedInUser ? loggedInUser.friends.filter(friend => friend.id === user.id).length > 0 ? true : false : false)
    setButtonView(false)
  }, [loggedInUser, user])

  return (
    <div>
      <div>
        <h3>{user.userName}</h3>
        <button onClick={() => setButtonView(prevView => !prevView)}>options</button>
        <ul style={buttonView ? { display: 'block' } : { display: 'none' }}>
          <li style={
            loggedInUser && ((loggedInUser.id === user.id) || isFriend) ?
              { display: 'none' } : { display: 'block' }
          }>
            <button
              onClick={isLoggedIn?() => onAddFriend({recieverId: user.id}):()=>alert("Must Be Logged In To Add Friends")}
            >Add Friend</button>
          </li>
          <li style={isOwner && isAdmin ? { display: 'block' } : { display: 'none' }}>
            <button
              style={isOwner && isAdmin ? { display: 'block' } : { display: 'none' }}
              onClick={() => onRemoveUser({ userId: user.id, groupId: selectedGroup.groupId })}
            >Remove</button>
          </li>
          <li style={user.membership === 'Admin' && isOwner ? { display: 'block' } : { display: 'none' }}>
            <button
              onClick={() => onRemoveGroupAdmin({ userId: user.id, groupId: selectedGroup.groupId })}
            >Make Member</button>
          </li>
          <li style={user.membership === 'Admin' && isOwner ? { display: 'block' } : { display: 'none' }}>
            <button
              onClick={() => onTransferGroupOwner({ userId: user.id, groupId: selectedGroup.groupId })}
            >Make Owner</button>
          </li>
          <li style={user.membership === 'Member' && isOwner ? { display: 'block' } : { display: 'none' }}>
            <button
              onClick={() => onMakeGroupAdmin({ userId: user.id, groupId: selectedGroup.groupId })}
            >Make Admin</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default User