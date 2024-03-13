import React, { useEffect, useState } from 'react';

import './friendsView.css';

const FriendsView = (props) => {
  let { isLoggedIn, loggedInUser, onCancelFriend, onAcceptRequest, onDenyRequest, onConfirmNotification, onRemoveFriend } = props
  let [friendView, setView] = useState(false)
  let [pending, setPendingList] = useState(undefined)
  let [friends, setFriendsList] = useState(undefined)
  let [requests, setRequestList] = useState(undefined)
  let [denied, setDeniedList] = useState(undefined)
  let [accepted, setAcceptedList] = useState(undefined)

  useEffect(() => {
    setPendingList(loggedInUser ? loggedInUser.friends.filter(user => user.relationShip.status === 1) : undefined)
    setRequestList(loggedInUser ? loggedInUser.requests.filter(user => user.relationShip.status === 1) : undefined)
    setFriendsList(loggedInUser ? loggedInUser.friends.filter(user => user.relationShip.status === 2) : undefined)
    setDeniedList(loggedInUser ? loggedInUser.friends.filter(user => user.relationShip.status === 3 && user.relationShip.active === 1) : undefined)
    setAcceptedList(loggedInUser ? loggedInUser.friends.filter(user => user.relationShip.status === 2 && user.relationShip.active === 1) : undefined)
  }, [loggedInUser])

  return (
    <div>
      {isLoggedIn ?
        <div className="friends-container">
          <div className="tab">
            <button className="tablinks" onClick={() => setView(false)}>
              <h3>Friend List</h3>
            </button>
            <button className="tablinks" onClick={() => setView(true)}>
              <h3>Friend Requests</h3>
            </button>
          </div>

          <div className="friends-pending" style={friendView ? { display: 'none' } : { display: 'block' }}>
            <div className="pending-list" >
              <h2>Pending Friends</h2>
              {pending ? pending.map(user => (
                <div key={user.id} className="friends-request-notification">
                  <div>
                    <h4>{user.userName}</h4>
                    <p>Request Has Been Sent</p>
                  </div>
                  <button onClick={() => onCancelFriend(user.id)}>Cancel</button>
                </div>
              )) : <span>loading...</span>}
              {denied ? denied.map(user => (
                <div key={user.id}>
                  <div>
                    <h4>{user.userName}</h4>
                    <p>Has Denied your request</p>
                  </div>
                  <button onClick={() => onConfirmNotification({ userId: user.id })}>Okay</button>
                </div>
              )) : <span>loading...</span>}
              {accepted ? accepted.map(user => (
                <div key={user.id}>
                  <div>
                    <h4>{user.userName}</h4>
                    <p>Has accepted your request</p>
                  </div>
                  <button onClick={() => onConfirmNotification({ userId: user.id })}>Okay</button>
                </div>
              )) : <span>loading...</span>}
            </div>

            {/* <div className="scrollable" > */}
              <div className="friends-list">
                <h2>Friends List</h2>
                {friends ? friends.map(user => (
                  <div key={user.id} className="friends">
                    <h4>{user.userName}</h4>
                    <button onClick={() => onRemoveFriend(user.id)}>Remove</button>
                  </div>
                )) : null}
              </div>
            {/* </div> */}
          </div>

          <div style={friendView ? { display: 'block' } : { display: 'none' }} className="incoming-request-wrapper">
            {requests ? requests.map(user => (
              <div key={user.id} style={(user.relationShip.recieverId === loggedInUser.id) ? { display: 'flex' } : { display: 'none' }} className="incoming-request">
                <div>
                  <h3>{user.userName}</h3>
                  <p>Has sent you a friend request</p>
                </div>

                <div className="incoming-request-btn">
                  <button className="incoming-request-deny-btn" onClick={() => onDenyRequest({ userId: user.id })}>Deny</button>
                  <button className="incoming-request-accept-btn" onClick={() => onAcceptRequest({ userId: user.id })}>Accept</button>
                </div>
              </div>
            )) : <span>loading...</span>}
          </div>
        </div> :
        <div>
          <h3>Create an account to add friends</h3>
        </div>}
    </div>
  )
}

export default FriendsView