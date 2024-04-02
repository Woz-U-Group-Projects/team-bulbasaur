import React, { useEffect, useState } from "react";
import { connect, DispatchProp } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
//CSS
import "./App.css";
//actions
import { utilActions, userActions, postActions, groupActions } from './actions';
//components
import MainPage from "./components/mainPage/mainPage";
import Login from "./components/login/login";
// import SignUp from "./components/signup/signup";
import Profile from './components/profile/profile'
import Navigation from "./components/navigation/NavBar";
import GroupPage from "./components/groupPage/groupPage";

import { SignUp } from "./views";

// import Feed from "./views/Feed";

function App(props) {
  const { onSendToken } = props;

  useEffect(() => {
    const token = document.cookie;
    if (token) onSendToken();
  }, [onSendToken]);

  return (
    <Router>
      {/* {!props.profile && !props.selectedGroup ? <Redirect to='/' /> : null} */}
      {/* {props.isLoggedIn ? <Redirect to='/' /> : <Redirect to='/login' />} */}
      <div className="App">
        <Navigation {...props} />
        <Switch>
          <Route exact path='/'>
            <MainPage {...props} />
            {/* <Feed loggedIn={props.isLoggedIn} user={props.loggedInUser} /> */}
          </Route>
          <Route path='/login'>
            <Login {...props} />
          </Route>
          <Route path='/signup'>
            <SignUp onSignup={props.onSignup} />
          </Route>
          <Route path='/profile'>
            <Profile {...props} />
          </Route>
          <Route path={'/groupPage'}>
            <GroupPage {...props} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch, state) => {
  const { verifyLogin, login, signup, logout } = utilActions;
  const { getUsers, getUser, addFriend, acceptRequest, confirmAccepted, rejectRequest, confirmRejected, deleteFriend } = userActions;
  const { getPosts, createPost, editPost, deletePost, createComment, deleteComment } = postActions;
  const { getGroups, getGroup, createGroup, editGroup, deleteGroup, joinGroup, removeUser, promoteUser, demoteUser, transferOwnership } = groupActions;
  return {
    // utility actions
    onSendToken: () => (
      verifyLogin.action().then(user => dispatch({ type: verifyLogin.key, payload: user }))
    ),
    onSignup: (newUser) => (
      signup.action(newUser).then(user => dispatch({ type: signup.key, payload: user }))
    ),
    onLogin: (userInfo) => (
      login.action(userInfo).then(user => dispatch({ type: login.key, payload: user }))
    ),
    onLogout: () => (
      logout.action().then(() => dispatch({ type: logout.key }))
    ),

    // user actions
    onGetUsers: () => (
      getUsers.action().then(users => dispatch({ type: getUsers.key, payload: users }))
    ),
    onGetProfile: (userId) => (
      getUser.action(userId).then(user => dispatch({ type: getUser.key, payload: user }))
    ),
    onAddFriend: (addresseeId) => (
      addFriend.action(addresseeId).then(friendId => dispatch({ type: addFriend.key, payload: friendId }))
    ),
    onAcceptRequest: (addresseeId) => (
      acceptRequest.action(addresseeId).then(friendId => dispatch({ type: acceptRequest.key, payload: friendId }))
    ),
    onConfirmAccepted: (addresseeId) => (
      confirmAccepted.action(addresseeId).then(friendId => dispatch({ type: confirmAccepted.key, payload: friendId }))
    ),
    onRejectRequest: (addresseeId) => (
      rejectRequest.action(addresseeId).then(userId => dispatch({ type: rejectRequest.key, payload: userId }))
    ),
    onConfirmRejected: (addresseeId) => (
      confirmRejected.action(addresseeId).then(userId => dispatch({ type: confirmRejected.key, payload: userId }))
    ),
    onDeleteFriend: (addresseeId) => (
      deleteFriend.action(addresseeId).then(userId => dispatch({ type: deleteFriend.key, payload: userId }))
    ),
    onCleanUpProfile: () => dispatch({ type: 'CLEAN_UP_PROFILE' }),

    // group actions
    onCreateGroup: (obj) => (
      createGroup.action(obj).then(data => dispatch({ type: createGroup.key, payload: data }))
    ),
    onGetGroups: () => (
      getGroups.action().then(data => dispatch({ type: getGroups.key, payload: data }))
    ),
    onGetGroupPage: (groupId) => (
      getGroup.action(groupId).then(group => dispatch({ type: getGroup.key, payload: group }))
    ),
    onEditGroup: (obj) => (
      editGroup.action(obj).then(data => dispatch({ type: editGroup.key, payload: data }))
    ),
    onDeleteGroup: (groupId) => (
      deleteGroup.action(groupId).then(groupId => dispatch({ type: deleteGroup.key, payload: groupId }))
    ),
    onJoinGroup: (groupId) => (
      joinGroup.action(groupId).then(groupId => dispatch({ type: joinGroup.key, payload: groupId }))
    ),
    onRemoveUser: (ids) => (
      removeUser.action(ids).then(userId => dispatch({ type: removeUser.key, payload: userId }))
    ),
    onPromoteUser: (ids) => (
      promoteUser.action(ids).then(userId => dispatch({ type: promoteUser.key, payload: userId }))
    ),
    onDemoteUser: (ids) => (
      demoteUser.action(ids).then(userId => dispatch({ type: demoteUser.key, payload: userId }))
    ),
    onTransferOwnership: (ids) => (
      transferOwnership.action(ids).then(userId => dispatch({ type: transferOwnership.key, payload: userId }))
    ),
    onCleanUpGroup: () => dispatch({ type: 'CLEAN_UP_GROUP' }),

    // post actions
    onGetPosts: () => (
      getPosts.action().then(posts => dispatch({ type: getPosts.key, payload: posts }))
    ),
    onCreatePost: (postData) => (
      createPost.action(postData).then(post => dispatch({ type: createPost.key, payload: post }))
    ),
    onEditPost: (postEdit) => (
      editPost.action(postEdit).then(post => dispatch({ type: editPost.key, payload: post }))
    ),
    onDeletePost: (postId) => (
      deletePost.action(postId).then(postId => dispatch({ type: deletePost.key, payload: postId }))
    ),
    onCreateComment: (commentData) => (
      createComment.action(commentData).then(comment => dispatch({ type: createComment.key, payload: comment }))
    ),
    onDeleteComment: (commentIdObj) => (
      deleteComment.action(commentIdObj).then(commentIdObj => dispatch({ type: deleteComment.key, payload: commentIdObj }))
    ),
  }
}

const mapStateToProps = (state) => {
  return {
    signupStatus: state.signupStatus,
    users: state.users,
    groups: state.groups,
    loggedInUser: state.loggedInUser,
    isLoggedIn: state.isLoggedIn,
    posts: state.posts,
    userPosts: state.userPosts,
    profile: state.profile,
    profilePosts: state.profilePosts,
    selectedGroup: state.selectedGroup,
    groupPosts: state.groupPosts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
