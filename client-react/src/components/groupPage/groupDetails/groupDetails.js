import React, { useState } from 'react'
import EditGroupDescription from '../../forms/editGroupDescription/editGroupDescription'

const GroupDetails = props => {
  let { isOwner, selectedGroup, owner, onUpdateGroupVotes } = props

  let [formView, setView] = useState(false)

  return (
    <div className='container toLeft'>
      <div className='info'>
        <h1>{selectedGroup.groupName}</h1><br />
        <div>
          <h3>Owner: </h3>
          <p>{owner ? owner.userName : null}</p>
          <div>
            <button onClick={() => onUpdateGroupVotes({ type: 'likes', dislikes: selectedGroup.likes, groupId: selectedGroup.groupId })} >
              Likes
            </button>
            <button onClick={() => onUpdateGroupVotes({ type: 'dislikes', dislikes: selectedGroup.dislikes, groupId: selectedGroup.groupId })} >
              Dislikes
            </button>
          </div>
        </div><br />
      </div>

      <div className='form'>
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