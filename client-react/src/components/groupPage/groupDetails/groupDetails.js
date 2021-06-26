import React, { useState } from 'react'
import EditGroupDescription from '../../forms/editGroupDescription/editGroupDescription';

import './groupDetails.css';

const GroupDetails = props => {
  let { isOwner, selectedGroup, owner, onUpdateGroupVotes, isMember, onJoinGroup, onLeaveGroup, onDisbandGroup, loggedInUser } = props

  let [formView, setView] = useState(false)

  return (
    <div className='group-owner-container'>
      <div className='owner-info'>
        <h1>{selectedGroup.groupName}</h1><br />
        <div>
          <h3>Owner: <span>{owner ? owner.userName : null}</span></h3>
          <div>
            <button onClick={() => onUpdateGroupVotes({ type: 'likes', dislikes: selectedGroup.likes, groupId: selectedGroup.groupId })} >
              Likes: {selectedGroup.likes}
            </button>
            <button onClick={() => onUpdateGroupVotes({ type: 'dislikes', dislikes: selectedGroup.dislikes, groupId: selectedGroup.groupId })} >
              Dislikes: {selectedGroup.dislikes}
            </button>
          </div>
          <div>
            <button 
              onClick={()=>onJoinGroup({groupId:selectedGroup.groupId, userId:loggedInUser.id})}
              style={isMember?{display:'none'}:{display:'inline'}} 
            >
              Join
            </button>
            <button 
              onClick={()=>onLeaveGroup({groupId:selectedGroup.groupId, userId:loggedInUser.id})}
              style={isMember&&!isOwner?{display:'inline'}:{display:'none'}} 
            >
              Leave
            </button>
            <button 
              onClick={()=>onDisbandGroup({groupId:selectedGroup.groupId, userId:loggedInUser.id})}
              style={isOwner?{display:'inline'}:{display:'none'}} 
            >
              Disband
            </button>
          </div>
        </div>
      </div>

      <div className='group-description'>
        <div className="group-owner-description">
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
      </div>
    </div>
  )
}

export default GroupDetails