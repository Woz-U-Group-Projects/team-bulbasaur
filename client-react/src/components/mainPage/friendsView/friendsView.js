import React, { useEffect, useState } from 'react';

import './friendsView.css';

const FriendsView = (props) => {
  const {
    isLoggedIn, loggedInUser, onAcceptRequest, onConfirmAccepted, onRejectRequest, onConfirmRejected, onDeleteFriend,
    onAddFriend,
  } = props
  const [view, setView] = useState('people');
  const [friendCount, setfriendCount] = useState(0);
  const [requestCount, setRequestcount] = useState(0);

  useEffect(() => {
    if (isLoggedIn && loggedInUser) {
      setfriendCount(loggedInUser.friends.length);
      setRequestcount(loggedInUser.outgoing.length + loggedInUser.incoming.length);
    }
  }, [isLoggedIn, loggedInUser])

  return (
    <div>
      {isLoggedIn ? (
        <div className="friends-container">
          <div className="tab">
            <button className="tablinks" onClick={() => setView('people')}>
              <h3>People you may know</h3>
            </button>
            <button className="tablinks" onClick={() => setView('friends')}>
              <h3>Friend List <span>({friendCount})</span></h3>
            </button>
            <button className="tablinks" onClick={() => setView('requests')}>
              <h3>Friend Requests <span>({requestCount})</span></h3>
            </button>
          </div>

          {/* people */}
          <div className="people" style={view === 'people' ? { display: 'block' } : { display: 'none' }}>
            <h3>People you may know</h3>
            {props.users ? props.users.filter(user => (
              (
                loggedInUser &&
                user.userId !== loggedInUser.userId
                && !loggedInUser.denied.find(u => u.userId === user.userId)
                && !loggedInUser.friends.find(u => u.userId === user.userId)
                && !loggedInUser.incoming.find(u => u.userId === user.userId)
                && !loggedInUser.outgoing.find(u => u.userId === user.userId)
              )
                ? user
                : null
            )).map(user => (
              <div key={user.userId}>
                <h4 style={{ display: 'inline-block', marginRight: '20px' }}>{user.userName}</h4>
                <button onClick={() => onAddFriend(user.userId)}>
                  Add Friend
                </button>
              </div>
            )) : <span style={{ display: 'block', fontSize: "small" }}>loading users...</span>}
          </div>

          {/* friends */}
          <div className="friends-pending" style={view === 'friends' ? { display: 'block' } : { display: 'none' }}>
            <div className="friends-list">
              <h2>Friends List</h2>
              {loggedInUser.friends.length > 0 ? loggedInUser.friends.map(user => (
                <div key={user.userId} className="friends">
                  <h4>{user.userName}</h4>
                  <button onClick={() => onDeleteFriend(user.userId)}>Remove</button>
                  <button onClick={() => onDeleteFriend(user.userId)}>Block</button>
                </div>
              )) : <span style={{ display: 'block', fontSize: "small" }}>loading friends...</span>}
            </div>
          </div>

          {/* requests */}
          <div style={view === 'requests' ? { display: 'block' } : { display: 'none' }} className="incoming-request-wrapper">
            {/* Outgoing pending Friend Requests */}
            <h3>Outgoing requests</h3>
            {loggedInUser.outgoing.filter(user => user.relationship.status === 'pending').length > 0
              ? loggedInUser.outgoing.filter(user => user.relationship.status === 'pending').map(user => (
                <div key={user.userId} className="friends-request-notification">
                  <div>
                    <h4>{user.userName}</h4>
                    <p>Request Has Been Sent</p>
                  </div>
                  <button onClick={() => onDeleteFriend(user.userId)}>Cancel</button>
                </div>
              )) : <span style={{ display: 'block', fontSize: "small" }}>loading pending requests...</span>}

            <h3>Incoming requests</h3>
            {/* incoming Friend Requests */}
            {loggedInUser.incoming.length > 0 ? loggedInUser.incoming.filter(user => user.relationship.status === 'pending').map(user => (
              <div key={user.userId} className="incoming-request">
                <div>
                  <h3>{user.userName}</h3>
                  <p>Has sent you a friend request</p>
                </div>

                <div className="incoming-request-btn">
                  <button className="incoming-request-accept-btn" onClick={() => onAcceptRequest(user.userId)}>
                    Accept
                  </button>
                  <button className="incoming-request-deny-btn" onClick={() => onRejectRequest(user.userId)}>
                    Deny
                  </button>
                </div>
              </div>
            )) : <span style={{ display: 'block', fontSize: "small" }}>loading recieved requests...</span>}

            {/* Outgoing Accepted Friend Requests */}
            {loggedInUser.incoming.length > 0 ? loggedInUser.incoming.filter(user => user.relationship.status === 'accepted').map(user => (
              <div key={user.userId}>
                <div>
                  <h4>{user.userName}</h4>
                  <p>Has accepted your request</p>
                </div>
                <button onClick={() => onConfirmAccepted(user.userId)}>Okay</button>
              </div>
            )) : <span style={{ display: 'block', fontSize: "small" }}>loading accepted requests...</span>}

            {/* Outgoing Rejected Friend Requests */}
            {loggedInUser.incoming.length > 0 ? loggedInUser.incoming.filter(user => user.relationship.status === 'rejected').map(user => (
              <div key={user.userId}>
                <div>
                  <h4>{user.userName}</h4>
                  <p>Has rejected your request</p>
                </div>
                <button onClick={() => onConfirmRejected(user.userId)}>Okay</button>
              </div>
            )) : <span style={{ display: 'block', fontSize: "small" }}>loading rejected requests...</span>}
          </div>
        </div>
      ) : (
        <div>
          <h3>Create an account to add friends</h3>
        </div>
      )}
    </div>
  )
}

export default FriendsView