import React from "react";
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//CSS
import "./App.css";
//actions
import {
  getUsers, getUsersCompleted,
  getPosts, getPostsCompleted,
  updateVotes, updateVotesCompleted
} from './actions/actions'
//components
import MainPage from "./components/mainPage/mainPage";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";

function _App(props) {
  return (
    <Router>
      <div className="App">
        <nav>
          <div className='title'>
            <h1>DigiChat</h1>
          </div>
          <ul className='linksList'>
            <li className='login'>
              <Link to='/login'>Login</Link>
            </li>
            <li className='signup'>
              <Link to='/signup'>SignUp</Link>
            </li>
            <li className='profile'>
              <Link to='/'>Home</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path='/'>
            <MainPage {...props} />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          {/* <Route path={`/profile/${userId}`} ></Route> */}
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    onGetUsers: () => getUsers().then(users => dispatch(getUsersCompleted(users))),
    onGetPosts: () => getPosts().then(posts => dispatch(getPostsCompleted(posts))),
    onUpdateVotes: (type, current, postId) => updateVotes(type, current, postId).then( posts => dispatch(updateVotesCompleted(posts)))
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
