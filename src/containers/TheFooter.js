import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://api-vrs-admin.herokuapp.com" target="_blank" rel="noopener noreferrer">SuaXe</a>
        <span className="ml-1">&copy; Vehicle 4.0</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://api-vrs-admin.herokuapp.com" target="_blank" rel="noopener noreferrer">Tuesday Team</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
