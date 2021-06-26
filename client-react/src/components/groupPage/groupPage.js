import React, { useEffect, useState } from 'react'
import MemberView from './memberView/memberView'
import GroupDetails from './groupDetails/groupDetails'

import './groupPage.css'
import GroupPostView from './groupPostView/groupPostView'

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
        <div >
          {/* group details */}
          <GroupDetails {...props} isOwner={isOwner} owner={owner} isMember={isMember} />

          {/* group Members */}
          <MemberView {...props} isOwner={isOwner} isAdmin={isAdmin} />

          {/* group posts */}
          <GroupPostView {...props} isOwner={isOwner} isAdmin={isAdmin} isMember={isMember} />
        </div>

        : <span>Loading Page...</span>}
    </div>
  )
}

export default GroupPage