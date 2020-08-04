import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { callApi } from "../../utils/apiCaller";

const User = ({ match }) => {
  const [id] = useState(match.params.id);
  const [userData, setUser] = useState(10);

  const user = useSelector((state) =>
    state.user.data.sources.find((u) => u.id === match.params.id)
  );
  const userDetails = user
    ? Object.entries(user)
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" />
            Not found
          </span>,
        ],
      ];
  console.log(`hihihihii${userDetails}`);
  const handleChangeBannedUser = async (value) => {
    try {
      const isActive = value ? "true" : "false";
      const token = localStorage.getItem("_token");
      const response = await callApi(
        `account/${id}`,
        "PUT",
        { isActive },
        token
      );
      console.log(`1111${response}`);
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
              <CCol lg="9">User id: {match.params.id}</CCol>
              <CCol lg="3">
                {userDetails.map(([key, value]) => {
                  if (key == "isActive") {
                    return (
                      <button onClick={handleChangeBannedUser(value)}>
                        {" "}
                        {key ? "Active" : "Banned"}
                      </button>
                    );
                  }
                })}
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {userDetails.map(([key, value], index) => {
                  console.log(`key-${key}: value-${value}`);
                  return (
                    <tr key={index.toString()}>
                      <td>{`${key}:`}</td>
                      <td>
                        <strong>{value ? value.toString() : value}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
