import React, { useEffect, useState } from 'react'

const FriendsView = (props) => {
  let { isLoggedIn, loggedInUser, onCancelFriend, onAcceptRequest, onDenyRequest, onConfirmNotification, onRemoveFriend } = props
  let [friendView, setView] = useState(false)
  let [pending, setPendingList] = useState(undefined)
  let [friends, setFriendsList] = useState(undefined)
  let [requests, setRequestList] = useState(undefined)
  let [denied, setDeniedList] = useState(undefined)
  let [accepted, setAcceptedList] = useState(undefined)

  useEffect(() => {
    setPendingList(loggedInUser?loggedInUser.friends.filter(user => user.relationShip.status === 1):undefined)
    setRequestList(loggedInUser?loggedInUser.requests.filter(user => user.relationShip.status === 1):undefined)
    setFriendsList(loggedInUser?loggedInUser.friends.filter(user => user.relationShip.status === 2):undefined)
    setDeniedList(loggedInUser?loggedInUser.friends.filter(user => user.relationShip.status === 3 && user.relationShip.active === 1 ):undefined)
    setAcceptedList(loggedInUser?loggedInUser.friends.filter(user => user.relationShip.status === 2 && user.relationShip.active === 1 ):undefined)
  }, [loggedInUser])
  
  return (
    <>
      {isLoggedIn ?
        <>
          <div>
            <button onClick={() => setView(false)}>
              <h3>Friend List</h3>
            </button>
            <button onClick={() => setView(true)}>
              <h3>Friend Requests</h3>
            </button>
          </div>
          <div style={friendView?{display:'none'}:{display:'block'}}>
            <h2>Pending Friends</h2>
            {pending?pending.map(user => (
              <div
                key={user.id}
              >
                <h4>{user.userName}</h4>
                <p>Request Has Been Sent</p>
                <button onClick={() => onCancelFriend(user.id)}>Cancel</button>
              </div>
            )) : <span>loading...</span>}
            <hr/>
            {denied?denied.map(user => (
              <div
                key={user.id}
              >
                <h4>{user.userName}</h4>
                <p>Has Denied your request</p>
                <button onClick={() => onConfirmNotification({userId: user.id})}>Okay</button>
              </div>
            )) : <span>loading...</span>}
            {accepted?accepted.map(user => (
              <div
              key={user.id}
            >
              <h4>{user.userName}</h4>
              <p>Has accepted your request</p>
              <button onClick={() => onConfirmNotification({userId: user.id})}>Okay</button>
            </div>
            )) : <span>loading...</span>}
            <hr/>
            <h2>Friends</h2>
            {friends?friends.map(user => (
              <div key={user.id}>
                <h4>{user.userName}</h4>
                <button onClick={()=>onRemoveFriend(user.id)}>Remove</button>
              </div>
            )):null}
          </div>
          <div style={friendView?{display:'block'}:{display:'none'}}>
            {requests?requests.map(user => (
              <div
                key={user.id}
                style={(user.relationShip.recieverId === loggedInUser.id) ? { display: 'block' } : { display: 'none' }}
              >
                <h3>{user.userName}</h3>
                <p>Has sent you a friend request</p>
                <br/>

                <button onClick={() => onDenyRequest({userId:user.id})}>Deny</button>
                <button onClick={() => onAcceptRequest({userId:user.id})}>Accept</button>
              </div>
            )) : <span>loading...</span>}
          </div>
        </>:
        <>
          <h3>nothing to show</h3>
        </>}
    </>
  )
}

export default FriendsView