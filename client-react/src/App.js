import React from "react";
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
//CSS
import "./App.css";
//actions
import {
  getUsers, getUsersCompleted, signup, signupCompleted,
  login, loginCompleted, logout, logoutCompleted,
  getPosts, getPostsCompleted, makePost, makePostCompleted,
  updateVotes, updateVotesCompleted, deletePost, deletePostCompleted,
  editPost, editPostCompleted, makeComment, makeCommentCompleted, 
  updateCommentVotes, updateCommentVotesCompleted, deleteComment, deleteCommentCompleted,
  getProfile, getProfileCompleted, makePostByUserId, makePostByUserIdCompleted,
  updateVotesByUserId, updateVotesByUserIdCompleted, editPostByUserId, editPostByUserIdCompleted,
  deletePostByUserId, deletePostByUserIdCompleted, makeCommentByUserId, makeCommentByUserIdComplete,
  updateCommentVotesByUserId, updateCommentVotesByUserIdCompleted, deleteCommentByUserId, deleteCommentByUserIdCompleted,
  getAllGroups, getAllGroupsCompleted, joinGroup, joinGroupCompleted
} from './actions/actions'
//components
import MainPage from "./components/mainPage/mainPage";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Profile from './components/profile/profile'
import Navigation from "./components/navigation/nav";

function _App(props) {

  return (
    <Router>
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
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    onGetProfile: userId => getProfile(userId).then(data => dispatch(getProfileCompleted(data))),
    onGetUsers: () => getUsers().then(users => dispatch(getUsersCompleted(users))),
    onGetPosts: () => getPosts().then(posts => dispatch(getPostsCompleted(posts))),
    onUpdateVotes: (type, current, postId) => updateVotes(type, current, postId).then( posts => dispatch(updateVotesCompleted(posts))),
    onSignup: (object) => signup(object).then(data => dispatch(signupCompleted(data))),
    onLogin: (object) => login(object).then( data => dispatch(loginCompleted(data))),
    onLogout: () => logout().then( data => dispatch(logoutCompleted(data))),
    onMakePost: (obj) => makePost(obj).then( res => dispatch(makePostCompleted(res))),
    onMakeComment: (obj) => makeComment(obj).then( data => dispatch(makeCommentCompleted(data))),
    onDeletePost: (postId) => deletePost(postId).then(data => dispatch(deletePostCompleted(data))),
    onEditPost: (obj) => editPost(obj).then( data => dispatch(editPostCompleted(data))),
    onUpdateCommentVotes: (type, current, commentId) => updateCommentVotes(type, current, commentId).then( data => dispatch(updateCommentVotesCompleted(data))),
    ondeleteComment: obj => deleteComment(obj).then(data => dispatch(deleteCommentCompleted(data))),
    onUpdateVotesByUserId: (type, current, userId, postId) => updateVotesByUserId(type, current, userId, postId).then( data => dispatch(updateVotesByUserIdCompleted(data))),
    onMakePostByUserId: (obj) => makePostByUserId(obj).then( data => dispatch(makePostByUserIdCompleted(data))),
    onEditPostByUserId: obj => editPostByUserId(obj).then( data => dispatch(editPostByUserIdCompleted(data))),
    onDeletePostByUserId: (postId, userId) => deletePostByUserId(postId, userId).then( data => dispatch(deletePostByUserIdCompleted(data))),
    onMakeCommentByUserId: obj => makeCommentByUserId(obj).then( data => dispatch(makeCommentByUserIdComplete(data))),
    onUpdateCommentVotesByUserId: (obj) => updateCommentVotesByUserId(obj).then( data => dispatch(updateCommentVotesByUserIdCompleted(data))),
    ondeleteCommentByUserId: obj => deleteCommentByUserId(obj).then( data => dispatch(deleteCommentByUserIdCompleted(data))),
    onGetGroups: () => getAllGroups().then(data => dispatch(getAllGroupsCompleted(data))),
    onJoinGroup: (obj) => joinGroup(obj).then(data => dispatch(joinGroupCompleted(data)))
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
    profilePosts: state.profilePosts
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App)

export default App;
