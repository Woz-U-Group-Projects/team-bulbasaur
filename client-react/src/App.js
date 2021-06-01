import React, { useEffect } from "react";
import {connect} from 'react-redux'
//CSS
import "./App.css";
//actions
import { 
  getUsers, getUsersCompleted,
  getPosts, getPostsCompleted,
  // addVote, addVoteCompleted
} from './actions/actions'
//components
import MainPage from "./components/mainPage/mainPage";

function _App(props) {
  return (
    <div className="App">
      <MainPage {...props} />
    </div>
  );
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    onGetUsers: () => getUsers().then( users => dispatch(getUsersCompleted(users))),
    onGetPosts: () => getPosts().then( posts => dispatch(getPostsCompleted(posts))),
    // onAddVote: (type, current, postId) => addVote(type, current, postId).then( posts => dispatch(addVoteCompleted(posts)))
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    posts: state.posts
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App)

export default App;
