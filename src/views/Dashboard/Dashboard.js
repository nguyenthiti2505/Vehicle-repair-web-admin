import React, { lazy } from "react";

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import MainChartExample from "../charts/MainChartExample.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <MainChartExample style={{ height: '300px', marginTop: '40px' }} />
    </>
  );
};

export default Dashboard;
