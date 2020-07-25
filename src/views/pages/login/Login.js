import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'

import { loginRequest } from '../../../redux/authRedux/actions'
import { Spin } from 'antd'
import { Redirect } from 'react-router-dom'

const Login = () => {

  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")

  const { loading, token, message } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleLogin = () => {
    if (phoneNumber && password) {
      dispatch(loginRequest({ phoneNumber, password }))
    }
  }

  if (token) {
    if (localStorage.getItem("_token"))
      return <Redirect from="/" to="/" />
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <Spin tip="Loading..." size="large" spinning={loading}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <p className="text-danger">{message}</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="number"
                          className="no-spinner"
                          defaultValue={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}
                          placeholder="Phone number"
                          autoComplete="phone-number"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          defaultValue={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="success" onClick={handleLogin} className="px-4">Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CLink to="/register">
                            <CButton color="link" className="px-0">Forgot password?</CButton>
                          </CLink>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-success py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2 className="text-white">ADMIN</h2>
                      <br></br>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </Spin>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
