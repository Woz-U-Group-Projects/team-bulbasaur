import React, { useState } from 'react'
import EditGroupDescription from '../../forms/editGroupDescription/editGroupDescription'

const GroupPage = (props) => {
  let { selectedGroup, groupPosts } = props
  let [formView, setView] = useState(false)
  
  return (
    <div>
      {selectedGroup?
        <div>
          <h1>{selectedGroup.groupName}</h1>
          <div>
            <h4>{selectedGroup.discription}</h4>
            <div style={formView?{display:'block'}:{display:'none'}}>
              <EditGroupDescription {...props} group={selectedGroup} setView={setView} />
            </div>
            <div>
              <button style={formView?{display:'none'}:{display:'block'}} onClick={() => setView(true)}>Edit Description</button>
            </div>
          </div>
        </div>
      :<span>Loading Page...</span>}
    </div>
  )
}

export default GroupPage