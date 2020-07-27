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
    <CRow className="widgets">
      <CCol sm="12" lg="4" spinning={fetching}>
        <CWidgetDropdown
          color="gradient-primary"
          header={data?.totalCount}
          text= "Users Online"
          >
        <CImg
          align="center"
          width="160px"
          src= "https://www.iconsdb.com/icons/preview/white/conference-xxl.png"
          fluid
          className="mb-2"
        ></CImg>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="12" lg="4">
        <CWidgetDropdown
          color="gradient-info"
          header={dataStation?.totalCount}
          text="Stations Store"
        >
        <CImg
          align="center"
          width="160px"
          src= "https://www.iconsdb.com/icons/preview/white/train-2-xxl.png"
          fluid
          className="mb-2"
        ></CImg>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="12" lg="4">
        <CWidgetDropdown
          color="gradient-warning"
          header={orders?.totalCount}
          text="New Orders"
        >
        <CImg
          align="center"
          width="160px"
          src= "https://www.iconsdb.com/icons/preview/white/purchase-order-xxl.png"
          fluid
          className="mb-2"
      ></CImg>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
