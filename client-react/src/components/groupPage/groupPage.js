import React, { useEffect, useState } from 'react'
import EditGroupDescription from '../forms/editGroupDescription/editGroupDescription'
import GroupPostForm from '../forms/groupPostForm/groupPostForm'
import GroupPost from './groupPost/groupPost'
import './groupPage.css'

const GroupPage = (props) => {
  let {
    selectedGroup, groupPosts, onCleanUpGroup, loggedInUser, onJoinGroup, isLoggedIn, onLeaveGroup, onDisbandGroup,
    onUpdateGroupVotes, onRemoveUser, onMakeGroupAdmin, onRemoveGroupAdmin, onTransferGroupOwner
  } = props
  let [formView, setView] = useState(false)
  let [owner, setOwner] = useState(undefined)
  let [isOwner, checkOwner] = useState(false)
  let [admins, setAdmins] = useState([])
  let [isAdmin, checkAdmin] = useState(false)
  let [messageView, setMessageView] = useState(false)
  let [isMember, setMembership] = useState(false)
  console.log(isAdmin)

  useEffect(() => {
    setOwner(selectedGroup ? selectedGroup.users.filter(user => user.membership === 'Owner')[0] : undefined)
    checkOwner((owner && loggedInUser) ? owner.id === loggedInUser.id ? true : false : false)
    setMembership(loggedInUser && selectedGroup ? selectedGroup.users.filter(user => user.id === loggedInUser.id).length === 1 ? true : false : false)
    setAdmins(selectedGroup ? selectedGroup.users.filter(user => user.membership === 'Admin') : [])
    checkAdmin(loggedInUser && admins.length > 0 ? admins.filter(user => user.id === loggedInUser.id).length >= 1 ? true : false : false)
  }, [selectedGroup, loggedInUser, owner, admins])

  useEffect(() => {
    return () => {
      onCleanUpGroup()
      setView(false)
      setOwner(undefined)
      checkOwner(false)
    }
  }, [onCleanUpGroup])

  return (
    <div>
      {selectedGroup ?
        <div>
          <div className='container toLeft'>
            <div className='info'>
              <h1>{selectedGroup.groupName}</h1><br />
              <div>
                <h3>Owner: </h3>
                <p>{owner ? owner.userName : null}</p>
              </div><br />
            </div>

            <div className='form'>
              <div style={formView ? { display: 'none' } : { display: 'block' }}>
                <h3>Description</h3>
                <p>{selectedGroup.discription}</p>
              </div>
              <div style={formView && isOwner ? { display: 'block' } : { display: 'none' }}>
                <EditGroupDescription {...props} group={selectedGroup} setView={setView} />
              </div>
              <button
                style={isOwner ? formView ? { display: 'none' } : { display: 'block' } : { display: 'none' }}
                onClick={() => setView(true)}
              >
                Edit Description
              </button>
            </div>

            <div className='buttons'>
              <div>
                <button onClick={() => onUpdateGroupVotes({ type: 'likes', groupId: selectedGroup.groupId, likes: selectedGroup.likes })}>
                  Likes: {selectedGroup.likes}
                </button>
                <button onClick={() => onUpdateGroupVotes({ type: 'dislikes', groupId: selectedGroup.groupId, dislikes: selectedGroup.dislikes })}>
                  Dislikes: {selectedGroup.dislikes}
                </button>
              </div>
              <div>
                <button
                  style={isMember ? { display: 'none' } : { display: 'inline' }}
                  onClick={() => {
                    isLoggedIn ? onJoinGroup({ groupId: selectedGroup.groupId, userId: isLoggedIn ? loggedInUser.id : null })
                      : alert('you must login to join a group')
                  }}
                >
                  join
                </button>
                <button
                  style={isOwner || !isMember ? { display: 'none' } : { display: 'inline' }}
                  onClick={() => onLeaveGroup({ groupId: selectedGroup.groupId, userId: isLoggedIn ? loggedInUser.id : null })}
                >
                  Leave
                </button>
                <button
                  style={isOwner ? { display: 'inline' } : { display: 'none' }}
                  onClick={() => onDisbandGroup(selectedGroup.groupId)}
                >
                  Disband Group
                </button>
              </div>
            </div>
          </div>

          <div className='container toRight usersList'>
            <h3>Group Members</h3><hr/>
            <div>
              <div>
                <h4>Owner:</h4>
                {selectedGroup ? selectedGroup.users.filter(user=> user.membership==='Owner').map(user => (
                  <div key={user.id}>
                    <div>
                      <h3>{user.userName}</h3>
                    </div>
                    <div style={(isOwner || isAdmin) && isMember ? { display: 'block' } : { display: 'none' }}>
                      <button onClick={() => onRemoveUser({ userId: user.id, groupId: selectedGroup.groupId })}>Remove</button>
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
                )) : null}
              </div><hr/>
              <div>
                <h4>Admins:</h4>
                {selectedGroup ? selectedGroup.users.filter(user=> user.membership==='Admin').map(user => (
                  <div key={user.id}>
                    <div>
                      <h3>{user.userName}</h3>
                    </div>
                    <div style={(isOwner || isAdmin) && isMember ? { display: 'block' } : { display: 'none' }}>
                      <button onClick={() => onRemoveUser({ userId: user.id, groupId: selectedGroup.groupId })}>Remove</button>
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
                )) : null}
              </div><hr/>
              <div>
                <h4>Members: </h4>
                {selectedGroup ? selectedGroup.users.filter(user=> user.membership==='Member').map(user => (
                  <div key={user.id}>
                    <div>
                      <h3>{user.userName}</h3>
                    </div>
                    <div style={(isOwner || isAdmin) && isMember ? { display: 'block' } : { display: 'none' }}>
                      <button onClick={() => onRemoveUser({ userId: user.id, groupId: selectedGroup.groupId })}>Remove</button>
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
                )) : null}
              </div>
            </div>
          </div>

          <div className='container toLeft'>
            <button onClick={() => setMessageView(false)}>
              <h3>Posts<span style={messageView ? { display: 'inline' } : { display: 'none' }}>
                : {groupPosts.length}
              </span></h3>
            </button>
            <button style={isMember ? { display: 'inline' } : { display: 'none' }} onClick={() => setMessageView(true)}>
              <h3>Group Messages<span style={!messageView ? { display: 'inline' } : { display: 'none' }}>: 0</span></h3>
            </button>
            <div style={!messageView ? { display: 'block' } : { display: 'none' }}>
              <div style={isMember ? { display: 'block' } : { display: 'none' }}>
                <GroupPostForm {...props} group={selectedGroup} isAdmin={isAdmin} isOwner={isOwner} />
              </div>
              {groupPosts.length === 0 ? <span>No Posts Have Been Made Yet</span> : groupPosts.map(post => (
                <GroupPost key={post.id} {...props} post={post} isOwner={isOwner} />
              ))}
            </div>

            <div style={messageView ? { display: 'block' } : { display: 'none' }}>
              <span>Loading Messages...</span>
            </div>
          </div>
        </div>
        : <span>Loading Page...</span>}
    </div>
  )
}

export default GroupPage