import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import CreateGroupForm from '../../forms/createGroupForm/createGroupFrom';

import './index.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const GroupDisplay = ({ state, dispatch }) => {
  const [groupFormView, setFormView] = useState(false);

  library.add(faPlus);

  return (
    <div className="groupview-container">
      <div style={groupFormView ? { display: 'block' } : { display: 'none' }}>
        {/* <CreateGroupForm {...props} setFormView={setFormView} /> */}
      </div>
      <div className="group-add">
        <h1>Popular Groups</h1>
        <FontAwesomeIcon className="add-icon" icon="plus" onClick={() => state.loggedIn ? setFormView(true) : alert('you must be logged in to create a new group')}/>
      </div>

      <div >
        {state.groups.length === 0 ? null : state.groups.map(group => (
          
            <div key={group.groupId} className="group-card">
              <Link 
                // onClick={() => onGetGroupPage(group.groupId)}
                style={{textDecoration:'none'}} 
                to='/groupPage' 
              >
                <div className="group-name">
                  <div>
                    <h3>{group.groupName}</h3>
                  </div>
                  <div>
                    {/* <p>Members: {group.users.length}</p> */}
                  </div>
                </div>
                
                <div className="group-vote-main">
                  <div className="group-vote">
                    <span>{group.likes}</span> Likes
                  </div>
                  <div className="group-vote">
                    <span>{group.dislikes}</span> Dislikes
                  </div>
                </div>
              </Link>    
                {/* <button onClick={() => {
                  state.loggedIn ? onJoinGroup({ groupId: group.groupId, userId: state.loggedIn ? loggedInUser.id : null }) : alert('you must login to join a group')
                }}>
                Join
              </button> */}
            </div>
          
        ))}
      </div>
    </div>
  )
}

export default GroupDisplay;
