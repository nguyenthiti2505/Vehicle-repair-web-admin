import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";

import { fetchUsers } from "../../redux/userRedux/actions";
import { fetchStations } from "../../redux/stationRedux/actions";
import { callApi } from "../../utils/apiCaller";

const WidgetsDropdown = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { fetching, data } = useSelector((state) => state.user);
  const dataStation = useSelector((state) => state.station.data);

  const [pageSize, setPageSize] = useState(10);
  const [orders, setOrders] = useState([]);

  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");

  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);

  const [page, setPage] = useState(currentPage);

  const fetchStationOrders = async () => {
    try {
      const token = localStorage.getItem("_token");
      const response = await callApi(`dashboard/orders`, "GET", null, token);
      setOrders(response.data);
    } catch (e) {
      console.log("fetchOrders -> e.response", e.response);
    }
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    dispatch(fetchUsers({ pageIndex: page, pageSize }));
    currentPage !== page && setPage(currentPage);
    dispatch(fetchStations({ pageIndex: page, pageSize }));
    fetchStationOrders();
  }, [currentPage, pageSize, page, dispatch, history]);
  console.log(dataStation);

  return (
    <CRow>
      <CCol sm="12" lg="4" spinning={fetching}>
        <CWidgetDropdown
          color="gradient-primary"
          header={data?.totalCount}
          text="Users"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "100px" }}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="12" lg="4">
        <CWidgetDropdown
          color="gradient-info"
          header={dataStation?.totalCount}
          text="Stations"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "100px" }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-location-pin" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="12" lg="4">
        <CWidgetDropdown
          color="gradient-warning"
          header={orders?.totalCount}
          text="Orders"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: "100px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
