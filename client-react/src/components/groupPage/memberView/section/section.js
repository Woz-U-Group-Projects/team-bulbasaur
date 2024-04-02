import React from 'react'
import User from './user/user'

const MemberSection = props => {
  let { title, members } = props

  return (
    <div>
      <h4>{title} of the group:</h4>
      {members ? members.map(user => (
        <User  key={user.userId} {...props} user={user} />
      )) : null}
    </div>
  )
}

export default MemberSection