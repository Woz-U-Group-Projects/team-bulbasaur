import React from 'react'
import MemberSection from './section/section'
import User from './section/user/user';

const MemberView = props => {
  let { selectedGroup } = props

  return (
    <div>
      <h3>Group Members</h3>
      <div>
        <MemberSection {...props} title='Owner' members={selectedGroup.users.filter(user => user.membership === 'Owner')} />
        <MemberSection {...props} title='Admins' members={selectedGroup.users.filter(user => user.membership === 'Admin')} />
        <MemberSection {...props} title='Members' members={selectedGroup.users.filter(user => user.membership === 'Member')} />
      </div>
    </div>
  )
}

export default MemberView