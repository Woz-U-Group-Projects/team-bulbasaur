import React, { useEffect, useState } from 'react'
import MemberView from './memberView/memberView'
import GroupDetails from './groupDetails/groupDetails'
import GroupPostView from './groupPostView/groupPostView'

import './groupPage.css'

const GroupPage = (props) => {
  let { selectedGroup, onCleanUpGroup, loggedInUser } = props
  
  let [owner, setOwner] = useState(undefined)
  let [isOwner, checkOwner] = useState(false)
  let [admins, setAdmins] = useState([])
  let [isAdmin, checkAdmin] = useState(false)
  let [isMember, setMembership] = useState(false)

  useEffect(() => {
    setOwner(selectedGroup ? selectedGroup.users.filter(user => user.membership === 'Owner')[0] : undefined)
    checkOwner((owner && loggedInUser) ? owner.id === loggedInUser.id ? true : false : false)
    setMembership(loggedInUser && selectedGroup ? selectedGroup.users.filter(user => user.id === loggedInUser.id).length === 1 ? true : false : false)
    setAdmins(selectedGroup ? selectedGroup.users.filter(user => user.membership === 'Admin') : [])
    checkAdmin(loggedInUser && admins.length > 0 ? admins.filter(user => user.id === loggedInUser.id).length >= 1 ? true : false : false)
  }, [selectedGroup, loggedInUser, owner, admins])

  useEffect(() => {
    return () => {
      onCleanUpGroup()
      setOwner(undefined)
      checkOwner(false)
    }
  }, [onCleanUpGroup])

  return (
    <div>
      {selectedGroup ?
      <div className="group-page-container">
        <div className="group-page-detail">
          <div className="group-page-owner">
            {/* group details */}
            <GroupDetails {...props} isOwner={isOwner} owner={owner} />
          </div>

          <div className="group-posts-view">
            {/* group posts */}
            <GroupPostView {...props} isOwner={isOwner} isAdmin={isAdmin} isMember={isMember} />
          </div>
        </div>

        <div className="group-page-members">
          {/* group Members */}
          <MemberView {...props} isOwner={isOwner} isAdmin={isAdmin} />
        </div>
      </div>

      : <span>Loading Page...</span>}
    </div>
  )
}

export default GroupPage