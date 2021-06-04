import React, { useState } from "react";
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
  getUsers, getUsersCompleted,
  getProfileById, getProfileByIdCompleted,
  getPosts, getPostsCompleted,
  getPostsByUserId, getPostsByUserIdCompleted,
  updateVotes, updateVotesCompleted,
  signup, signupCompleted,
  login, loginCompleted
} from './actions/actions'
//components
import MainPage from "./components/mainPage/mainPage";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Profile from './components/profile/profile'
import Navigation from "./components/navigation/nav";

function _App(props) {
  let [userId, setUserId] = useState(1)
  return (
    <Router>
      <div className="App">
        <Navigation {...props} />
        <Switch>
          <Route exact path='/'>
            <MainPage {...props} setUserId={setUserId} />
          </Route>
          <Route path='/login'>
            <Login {...props} />
          </Route>
          <Route path='/signup'>
            <SignUp {...props} />
          </Route>
          <Route path={`/profile/${userId}`} >
            <Profile {...props} userId={userId} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    onGetUsers: () => getUsers().then(users => dispatch(getUsersCompleted(users))),
    onGetProfileById: (userId) => getProfileById(userId).then((user) => dispatch(getProfileByIdCompleted(user))),
    onGetPosts: () => getPosts().then(posts => dispatch(getPostsCompleted(posts))),
    onGetPostsById: (userId) => getPostsByUserId(userId).then(posts => dispatch(getPostsByUserIdCompleted(posts))),
    onUpdateVotes: (type, current, postId) => updateVotes(type, current, postId).then( posts => dispatch(updateVotesCompleted(posts))),
    onSignup: (object) => signup(object).then(data => dispatch(signupCompleted(data))),
    onLogin: (object) => login(object).then( data => dispatch(loginCompleted(data))),
  }
}

const mapStateToProps = (state) => {
  return {
    signupStatus: state.signupStatus,
    users: state.users,
    loggedInUser: state.loggedInUser,
    posts: state.posts,
    userPosts: state.userPosts,
    profile: state.profile
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App)

export default App;
