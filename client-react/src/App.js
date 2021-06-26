import React, { useEffect } from "react";
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
//CSS
import "./App.css";
//actions
import {
  sendToken, sendTokenCompleted, getUsers, getUsersCompleted, signup, signupCompleted, login, loginCompleted, logout, logoutCompleted, 
  getPosts, getPostsCompleted, makePost, makePostCompleted, updateVotes, updateVotesCompleted, deletePost, deletePostCompleted,
  editPost, editPostCompleted, makeComment, makeCommentCompleted, updateCommentVotes, updateCommentVotesCompleted,
  deleteComment, deleteCommentCompleted, getProfile, getProfileCompleted, makePostByUserId, makePostByUserIdCompleted,
  cleanUpProfile, updateVotesByUserId, updateVotesByUserIdCompleted, editPostByUserId, editPostByUserIdCompleted,
  deletePostByUserId, deletePostByUserIdCompleted, makeCommentByUserId, makeCommentByUserIdComplete, updateCommentVotesByUserId,
  updateCommentVotesByUserIdCompleted, deleteCommentByUserId, deleteCommentByUserIdCompleted, getAllGroups, getAllGroupsCompleted,
  joinGroup, joinGroupCompleted, createGroup, createGroupCompleted, getGroupPage, getGroupPageCompleted, cleanUpGroupPgae,
  editGroupDescription, editGroupDescriptionCompleted, createGroupPost, createGroupPostCompleted, leaveGroup, leaveGroupCompleted,
  disbandGroup, disbandGroupCompleted, updateGroupVotes, updateGroupVotesCompleted, deleteGroupPost, deleteGroupPostCompleted,
  editGroupPost, editGroupPostCompleted, updateGroupPostVotes, updateGroupPostVotesCompleted, makeGroupComment,
  makeGroupCommentCompleted, deleteGroupComment, deleteGroupCommentCompleted, updateGroupCommentVotes, updateGroupCommentVotesCompleted,
  removeUser, removeUserCompleted, makeGroupAdmin, makeGroupAdminCompleted, removeGroupAdmin, removeGroupAdminCompleted,
  transferGroupOwner, transferGroupOwnerCompleted, addFriend, addFriendCompleted, cancelFriend, cancelFriendCompleted,
  acceptRequest, acceptRequestCompleted, denyRequest, denyRequestCompleted, confirmNotification, confirmNotificationCompleted,
  removeFriend, removeFriendCompleted
} from './actions/actions'
//components
import MainPage from "./components/mainPage/mainPage";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Profile from './components/profile/profile'
import Navigation from "./components/navigation/nav";
import GroupPage from "./components/groupPage/groupPage";

function _App(props) {
   let { onSendToken } = props

  useEffect(() => {
    let token = document.cookie
    if(token){
      onSendToken()
    }
  }, [onSendToken])

  return (
    <Router>
      {!props.profile && !props.selectedGroup ? <Redirect to='/' /> : null}
      <div className="App">
        <Navigation {...props} />
        <Switch>
          <Route exact path='/'>
            <MainPage {...props} />
          </Route>
          <Route path='/login'>
            <Login {...props} />
          </Route>
          <Route path='/signup'>
            <SignUp {...props} />
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
  return {
    onSendToken: () => sendToken().then(data => dispatch(sendTokenCompleted(data))),
    onGetProfile: userId => getProfile(userId).then(data => dispatch(getProfileCompleted(data))),
    onCleanUpProfile: () => dispatch(cleanUpProfile()),
    onCleanUpGroup: () => dispatch(cleanUpGroupPgae()),
    onGetUsers: () => getUsers().then(users => dispatch(getUsersCompleted(users))),
    onGetPosts: () => getPosts().then(posts => dispatch(getPostsCompleted(posts))),
    onUpdateVotes: (type, current, postId) => updateVotes(type, current, postId).then(posts => dispatch(updateVotesCompleted(posts))),
    onSignup: (object) => signup(object).then(data => dispatch(signupCompleted(data))),
    onLogin: (object) => login(object).then(data => dispatch(loginCompleted(data))),
    onLogout: () => logout().then(data => dispatch(logoutCompleted(data))),
    onMakePost: (obj) => makePost(obj).then(res => dispatch(makePostCompleted(res))),
    onMakeComment: (obj) => makeComment(obj).then(data => dispatch(makeCommentCompleted(data))),
    onDeletePost: (postId) => deletePost(postId).then(data => dispatch(deletePostCompleted(data))),
    onEditPost: (obj) => editPost(obj).then(data => dispatch(editPostCompleted(data))),
    onUpdateCommentVotes: (type, current, commentId) => updateCommentVotes(type, current, commentId).then(data => dispatch(updateCommentVotesCompleted(data))),
    ondeleteComment: obj => deleteComment(obj).then(data => dispatch(deleteCommentCompleted(data))),
    onUpdateVotesByUserId: (type, current, userId, postId) => updateVotesByUserId(type, current, userId, postId).then(data => dispatch(updateVotesByUserIdCompleted(data))),
    onMakePostByUserId: (obj) => makePostByUserId(obj).then(data => dispatch(makePostByUserIdCompleted(data))),
    onEditPostByUserId: obj => editPostByUserId(obj).then(data => dispatch(editPostByUserIdCompleted(data))),
    onDeletePostByUserId: (postId, userId) => deletePostByUserId(postId, userId).then(data => dispatch(deletePostByUserIdCompleted(data))),
    onMakeCommentByUserId: obj => makeCommentByUserId(obj).then(data => dispatch(makeCommentByUserIdComplete(data))),
    onUpdateCommentVotesByUserId: (obj) => updateCommentVotesByUserId(obj).then(data => dispatch(updateCommentVotesByUserIdCompleted(data))),
    ondeleteCommentByUserId: obj => deleteCommentByUserId(obj).then(data => dispatch(deleteCommentByUserIdCompleted(data))),
    onGetGroups: () => getAllGroups().then(data => dispatch(getAllGroupsCompleted(data))),
    onJoinGroup: (obj) => joinGroup(obj).then(data => dispatch(joinGroupCompleted(data))),
    onCreateGroup: (obj) => createGroup(obj).then(data => dispatch(createGroupCompleted(data))),
    onGetGroupPage: (groupId) => getGroupPage(groupId).then(data => dispatch(getGroupPageCompleted(data))),
    onEditGroupDescription: (obj) => editGroupDescription(obj).then(data => dispatch(editGroupDescriptionCompleted(data))),
    onCreateGroupPost: obj => createGroupPost(obj).then(data => dispatch(createGroupPostCompleted(data))),
    onLeaveGroup: obj => leaveGroup(obj).then(data => dispatch(leaveGroupCompleted(data))),
    onDisbandGroup: obj => disbandGroup(obj).then(data => dispatch(disbandGroupCompleted(data))),
    onUpdateGroupVotes: obj => updateGroupVotes(obj).then(data => dispatch(updateGroupVotesCompleted(data))),
    onDeleteGroupPost: obj => deleteGroupPost(obj).then(data => dispatch(deleteGroupPostCompleted(data))),
    onEditGroupPost: obj => editGroupPost(obj).then(data => dispatch(editGroupPostCompleted(data))),
    onUpdateGroupPostVotes: obj => updateGroupPostVotes(obj).then(data => dispatch(updateGroupPostVotesCompleted(data))),
    onMakeGroupComment: obj => makeGroupComment(obj).then(data => dispatch(makeGroupCommentCompleted(data))),
    onDeleteGroupComment: obj => deleteGroupComment(obj).then(data => dispatch(deleteGroupCommentCompleted(data))),
    onUpdateGroupCommentVotes: obj => updateGroupCommentVotes(obj).then(data => dispatch(updateGroupCommentVotesCompleted(data))),
    onRemoveUser: obj => removeUser(obj).then(data => dispatch(removeUserCompleted(data))),
    onMakeGroupAdmin: obj => makeGroupAdmin(obj).then(data => dispatch(makeGroupAdminCompleted(data))),
    onRemoveGroupAdmin: obj => removeGroupAdmin(obj).then(data => dispatch(removeGroupAdminCompleted(data))),
    onTransferGroupOwner: obj => transferGroupOwner(obj).then(data => dispatch(transferGroupOwnerCompleted(data))),
    onAddFriend: obj => addFriend(obj).then(data => dispatch(addFriendCompleted(data))),
    onCancelFriend: obj => cancelFriend(obj).then(data => dispatch(cancelFriendCompleted(data))),
    onAcceptRequest: obj => acceptRequest(obj).then(data => dispatch(acceptRequestCompleted(data))),
    onDenyRequest: obj => denyRequest(obj).then(data => dispatch(denyRequestCompleted(data))),
    onConfirmNotification: obj => confirmNotification(obj).then(data => dispatch(confirmNotificationCompleted(data))),
    onRemoveFriend: obj => removeFriend(obj).then(data => dispatch(removeFriendCompleted(data)))
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

const App = connect(mapStateToProps, mapDispatchToProps)(_App)

export default App;
