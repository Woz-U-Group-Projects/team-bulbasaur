import React, { useEffect } from "react";
import {connect} from 'react-redux'
import  Task from "./components/Task";
import "./App.css";
//actions
import { getUsers, getUsersCompleted } from './actions/actions'

function _App(props) {
  useEffect( () => {
    props.onGetUsers()
  },[])

  return (
    <div className="App">
      {props.users.length === 0 ? <p>nothing here</p> : props.users.map( user => {
        return <h1>{user.FullName}</h1>
      })}
    </div>
  );
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    onGetUsers: () => getUsers().then( users => dispatch(getUsersCompleted(users)))
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App)

export default App;
