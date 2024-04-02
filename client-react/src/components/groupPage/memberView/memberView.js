import React from 'react'
import MemberSection from './section/section'

import './memberView.css'
;
const MemberView = props => {
  let { selectedGroup } = props

  return (
    <div>
      <h2>Group Members</h2>
      <div className="group-member-container">
        <div className="owner-section">
          <MemberSection {...props} title='Owner' members={[selectedGroup.owner]} />
        </div>
        <div className="admins-section">
          <MemberSection {...props} title='Admins' members={selectedGroup.admins} />
        </div>
        <div className="members-section">
          <MemberSection {...props} title='Members' members={selectedGroup.members} />
        </div>
      </div>
    </div>
  )
}

export default MemberView