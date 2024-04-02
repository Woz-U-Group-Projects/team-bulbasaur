//css
import './index.css'

import React, { useEffect, useReducer } from 'react'
// import { Link } from 'react-router-dom'

// import PostForm from '../forms/postForm/postForm';
import { Post } from '../../components/global'
// import GroupView from './groupsView/groupView';
// import FriendsView from './friendsView/friendsView';
import { GroupDisplay } from '../../components/feed/';

import { groupActions, postActions, userActions } from '../../actions';

/**
 * @typedef {Object} feedState
 * @property {boolean} loggedIn
 * @property {import("../../../../server-express-mysql/controllers/GroupController").group[]} groups
 * @property {import("../../../../server-express-mysql/controllers/PostController").post[]} posts
 * @property {import("../../../../server-express-mysql/controllers/UserContoller").user[]} users
 */

/** 
 * @type {feedState}
 */
const feedState = {
  groups: [],
  posts: [],
  users: [],
}

/**
 * 
 * @param {feedState} state 
 * @param {{ type: string, payload: any }} action 
 * @returns 
 */
const feedReducer = (state, action) => {
  switch (action.type) {
    case 'GET_GROUPS': return { ...state, groups: action.payload }
    case 'GET_POSTS': return { ...state, posts: action.payload }
    case 'GET_USERS': return { ...state, users: action.payload }
    default: return { ...state }
  }
}

const Feed = ({ loggedIn, user }) => {
  const [state, dispatch] = useReducer(feedReducer, feedState);

  useEffect(() => {
    const { getGroups } = groupActions, { getPosts } = postActions, { getUsers } = userActions;
    getGroups.action().then(groups => dispatch({ type: getGroups.key, payload: groups }));
    getPosts.action().then(posts => dispatch({ type: getPosts.key, payload: posts }));
    getUsers.action().then(users => dispatch({ type: getUsers.key, payload: users }));
  }, []);

  return (
    <div className='mainPage-container'>
      <div className='groupList'>
        <GroupDisplay state={state} dispatch={dispatch} />
      </div>

      <div className='postsList'>
        <div className='postForm' style={loggedIn === true ? { display: 'block' } : { display: 'none' }}>
          {/* <PostForm {...props} /> */}
        </div>

        <div className='posts'>
          {state.posts.length === 0 ? <p>no posts have been made yet</p> : state.posts.map((post, i) => {
            return <Post key={i} loggedIn={loggedIn} post={post} user={user} onUpdateVotes={() => {}} />
          })}
        </div>
      </div>

      <div className='friendList'>
        {/* <FriendsView {...props} /> */}
      </div>
    </div>
  )
}

export default Feed;
