import React from 'react'
import MemberSection from './section/section'

const MemberView = props => {
  let { selectedGroup } = props

  return (
    <div className='container toRight usersList'>
      <h3>Group Members</h3><hr />
      <div>
        <MemberSection {...props} title='Owner' members={selectedGroup.users.filter(user => user.membership === 'Owner')} />
        <hr />
        <MemberSection {...props} title='Admins' members={selectedGroup.users.filter(user => user.membership === 'Admin')} />
        <hr />
        <MemberSection {...props} title='Members' members={selectedGroup.users.filter(user => user.membership === 'Member')} />
        <hr />
      </div>
    </div>
  )
}

export default MemberView