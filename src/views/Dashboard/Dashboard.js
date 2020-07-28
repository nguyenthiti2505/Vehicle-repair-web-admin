import React, { lazy } from "react";

import {
  // CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  // CCardFooter,
  // CCardHeader,
  CCol,
  // CProgress,
  CRow,
  // CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import MainChartExample from "../charts/MainChartExample.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <CCard className="dashboard-chart">
        <CCardBody>
          <CRow>
            <CCol sm="4">
              <h4 id="traffic" className="font-weight-bold card-title mb-0">Traffic 7 days</h4>
            </CCol>
            <CCol sm="4">
              <div className="date-traffic font-weight-bold text-center">{new Date().toDateString()}</div>
            </CCol>
            <CCol sm="4" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {
                  ['Week', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Week'}
                    >
                      {value}
                    </CButton>                    
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample style={{ height: '300px', marginTop: '40px' }} />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
