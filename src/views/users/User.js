import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { callApi } from "../../utils/apiCaller";

const User = ({ match }) => {
  const [id] = useState(match.params.id);

  const user = useSelector((state) =>
    state.user.data.sources.find((u) => u.id === match.params.id)
  );
  const [userData, setUser] = useState(user);

  const handleChangeBannedUser = async () => {
    try {
      const isActive = (userData?.isActive) ? false : true;
      const token = localStorage.getItem("_token");
      const response = await callApi(
        `account/${id}`,
        "PUT",
        { isActive },
        token
      );
      setUser(response.data);
    } catch (e) {
      console.log("banned user -> e.response", e.response);
    }
  };

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol lg="10"><span class="font-weight-bold">User id:</span> {match.params.id}</CCol>
              <CCol lg="2">
                  {(userData?.isActive) ? (
                      <button class="btn btn-danger button-ban" onClick={handleChangeBannedUser}>
                        Banned
                      </button>
                  ) : 
                  (
                      <button class="btn btn-success button-active" onClick={handleChangeBannedUser}>
                        Active
                      </button>
                  )}
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            {userData ? (
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>ID: </td>
                  <td>{userData.id}</td>
                </tr>
                <tr>
                  <td>Name: </td>
                  <td>{userData.name}</td>
                </tr>
                <tr>
                  <td>Roles: </td>
                  <td>{userData.roles}</td>
                </tr>
                <tr>
                  <td>Email: </td>
                  <td>{userData.email}</td>
                </tr>
                <tr>
                  <td>Email Confirmed: </td>
                  <td>{userData.emailConfirmed ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <td>Phone Number: </td>
                  <td>{userData.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Phone Number Confirmed: </td>
                  <td>{userData.phoneNumberConfirmed ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <td>Address: </td>
                  <td>{userData.address}</td>
                </tr>
                <tr>
                  <td>Device Token: </td>
                  <td>{userData.deviceToken}</td>
                </tr>
                <tr>
                  <td>Created On: </td>
                  <td>{userData.createdOn}</td>
                </tr>
                <tr>
                  <td>isActive: </td>
                  <td>{userData.isActive ? 'true' : 'false'}</td>
                </tr>
              </tbody>
            </table>
            ) : (
              <span>
            <CIcon className="text-muted" name="cui-icon-ban" />
            Not found
          </span>
            )
}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
