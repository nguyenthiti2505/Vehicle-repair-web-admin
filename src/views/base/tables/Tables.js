import React, { Component } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

import axios from "axios";
import { connect } from "react-redux";
import * as userActions from "../../../reduxs/userRedux/action";

import usersData from "../../users/UsersData";

const fields = [
  "name",
  "email",
  "phoneNumber",
  "createdOn",
  "roles",
  "isActive",
];

class Tables extends Component {
  constructor(props) {
    super(props);
    // this.props.fetchUser();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(`https://suaxe-admin-api.herokuapp.com/api/account/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTE1OTgxMTEwIiwianRpIjoiNjI2NWI3ZmUtZDI1Zi00NTIwLWI2YTQtMjMxMjY4YjA3ZDA1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwOTE1OTgxMTEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE1OTU4NDc2OTIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSJ9.15JytNoC3R8ccMUKXYrqwowv74eTDpqDJ4hpotbdip8",
        },
      })
      .then((res) => {
        console.log("RES", res);
        const users = res.data.sources;
        this.setState({ users });
      })
      .catch((error) => {
        console.log("ERROR", error.response.data);
      });
  }

  render() {
    console.log("user", this.state.users);
    const { users } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>Data User</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={users}
                  fields={fields}
                  striped
                  itemsPerPage={10}
                  pagination
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   console.log("ffff", state);

//   return {
//     userData: state.userReducer,
//   };
// };

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchUser: () => dispatch(userActions.fetchUser()),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Tables);
export default Tables;
