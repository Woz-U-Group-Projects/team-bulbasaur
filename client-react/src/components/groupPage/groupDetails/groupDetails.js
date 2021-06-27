import React, { useState } from 'react'
import EditGroupDescription from '../../forms/editGroupDescription/editGroupDescription';

import './groupDetails.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const GroupDetails = props => {
  let { isOwner, selectedGroup, owner, onUpdateGroupVotes, isMember, onJoinGroup, onLeaveGroup, onDisbandGroup, loggedInUser } = props

  let [formView, setView] = useState(false)

  library.add(faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots);

  return (
    <div className='group-owner-container'>
      <div className='owner-info'>
        <h1>{selectedGroup.groupName}</h1><br />
        <div>
          <h3>Owner: <span>{owner ? owner.userName : null}</span></h3>
          <div className="group-vote-btn">
            <div className="group-vote-button">
              {/* <button onClick={() => onUpdateGroupVotes({ type: 'likes', dislikes: selectedGroup.likes, groupId: selectedGroup.groupId })} >
                Likes: {selectedGroup.likes}
              </button> */}
              <div className="thumbs-up-button">
                <FontAwesomeIcon icon="thumbs-up" onClick={() => onUpdateGroupVotes({ type: 'likes', likes: selectedGroup.likes, groupId: selectedGroup.groupId })} /> 
                <span>   {selectedGroup.likes}</span>
              </div>

              {/* <button onClick={() => onUpdateGroupVotes({ type: 'dislikes', dislikes: selectedGroup.dislikes, groupId: selectedGroup.groupId })} >
                Dislikes: {selectedGroup.dislikes}
              </button> */}
              <div className="thumbs-down">
                <FontAwesomeIcon className="thumbs-down-icon" icon="thumbs-down" onClick={() => onUpdateGroupVotes({ type: 'dislikes', dislikes: selectedGroup.dislikes, groupId: selectedGroup.groupId })} />
                <span>  {selectedGroup.dislikes}</span>
              </div>
            </div>

            <div>
              <button className="group-button-join"
                onClick={()=>onJoinGroup({groupId:selectedGroup.groupId, userId:loggedInUser.id})}
                style={isMember?{display:'none'}:{display:'inline'}} 
              >
                Join
              </button>
              <button className="group-button-leave"
                onClick={()=>onLeaveGroup({groupId:selectedGroup.groupId, userId:loggedInUser.id})}
                style={isMember&&!isOwner?{display:'inline'}:{display:'none'}} 
              >
                Leave
              </button>
              <button className="group-button-disband"
                onClick={()=>onDisbandGroup({groupId:selectedGroup.groupId, userId:loggedInUser.id})}
                style={isOwner?{display:'inline'}:{display:'none'}} 
              >
                Disband
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='group-description'>
        <div className="group-owner-description">
          <div style={formView ? { display: 'none' } : { display: 'block' }}>
            <h3>Description</h3>
            <div className="description-view">
              <p>{selectedGroup.discription}</p>
            </div>
          </div>
          <div style={formView && isOwner ? { display: 'block' } : { display: 'none' }}>
            <EditGroupDescription {...props} group={selectedGroup} setView={setView} />
          </div>

          <div className="group-button-description">
            <button 
              style={isOwner ? formView ? { display: 'none' } : { display: 'block' } : { display: 'none' }}
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