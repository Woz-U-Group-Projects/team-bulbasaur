import React, { useEffect } from 'react'
import MemberView from './memberView/memberView'
import GroupDetails from './groupDetails/groupDetails'
import GroupPostView from './groupPostView/groupPostView'

import './groupPage.css'

const GroupPage = (props) => {
  const { selectedGroup, onCleanUpGroup } = props;

  useEffect(() => {
    return () => {
      onCleanUpGroup()
    }
  }, [])

  return (
    <div>
      {selectedGroup ?
        <div className="group-page-container">
          <div className="group-page-detail">
            <div className="group-page-owner">
              {/* group details */}
              <GroupDetails {...props} />
            </div>

            <div className="group-posts-view">
              {/* group posts */}
              <GroupPostView {...props} />
            </div>
          </div>

          <div className="group-page-members">
            {/* group Members */}
            <MemberView {...props} />
          </div>
        </div>

        : <span>Loading Page...</span>}
    </div>
  )
}

export default GroupPage