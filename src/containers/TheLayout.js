import React, { useEffect } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { Redirect } from 'react-router-dom'

import { fetchProfileRequest } from '../redux/authRedux/actions'
import { useDispatch } from 'react-redux'

const TheLayout = () => {

  const token = localStorage.getItem("_token")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfileRequest())
  }, [dispatch])

  if (!token) {
    return <Redirect from="/" to="/login" />
  } else {
    return (
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
    )
  }
}

export default TheLayout