import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";

import { Spin, Skeleton, DatePicker } from "antd";
import { format } from "date-fns";

import { fetchUsers } from "../../redux/userRedux/actions";

const getBadge = (status) => {
  switch (status) {
    case true:
      return "success";
    default:
      return "danger";
  }
};

const Users = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { RangePicker } = DatePicker;
  const { fetching, data } = useSelector((state) => state.user);

  const [pageSize, setPageSize] = useState(10);

  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");

  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);

  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };
  const onChange = (e, newPage) => {
    // const startDay = new Date(e[0]);
    // 20/06/2020
    // const endDay = new Date(e[1]);
    // users?fromDate=01-07-2020&toDate=07-07-2020
    // currentPage !== newPage &&
    //   history.push(
    //     `/users?fromDate=${formatDateTime(e[0])}&toDate=${formatDateTime(e[1])}`
    //   );

    history.push(
      `/users?fromDate=${formatDateTime(e[0])}&toDate=${formatDateTime(e[1])}`
    );

    // if (currentPage !== newPage) {
    //   console.log("okkk");
    //   history.push(
    //     `/users?fromDate=${formatDateTime(e[0])}&toDate=${formatDateTime(e[1])}`
    //   );
    // } else {
    //   console.log("not okkk");
    // }
    // history.push(
    //   `/users?fromDate=${formatDateTime(e[0])}&toDate=${formatDateTime(e[1])}`
    // );
    // console.log([formatDateTime(e[0]), formatDateTime(e[1])]);
    console.log(`e${currentPage}`);
  };

  const formatDateTime = (date) => {
    const theTime = new Date(date);
    const day = theTime.getDate();
    const month = theTime.getMonth() + 1;
    const year = theTime.getFullYear();

    return `${("0" + day).slice(-2)}-${("0" + month).slice(-2)}-${year}`;
  };

  const paginationChange = (pageSize) => {
    setPageSize(pageSize);
    dispatch(fetchUsers({ pageIndex: page, pageSize }));
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    dispatch(fetchUsers({ pageIndex: page, pageSize }));
  }, [currentPage, page, dispatch, history]);

  return (
    <CRow>
      <CCol xl={12}>
        <Spin tip="Loading..." size="large" spinning={fetching}>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol lg="6">User</CCol>
                <CCol lg="6">
                  <RangePicker
                    format="DD-MM-YYYY HH:mm"
                    onChange={(e) => onChange(e, page)}
                    activePage={data?.pageIndex}
                    // onOk={onOk}
                  />
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <Skeleton loading={!data}>
                <CDataTable
                  items={data?.sources}
                  fields={[
                    { key: "name", _classes: "font-weight-bold" },
                    "email",
                    "phoneNumber",
                    "roles",
                    "createdOn",
                    "isActive",
                  ]}
                  hover
                  striped
                  itemsPerPageSelect={{
                    label: "Item/ 1 Page",
                    values: [10, 20, 50, 100, 200, 500],
                  }}
                  itemsPerPage={pageSize}
                  onPaginationChange={paginationChange}
                  clickableRows
                  sorter
                  tableFilter={{
                    label: "Search",
                    placeholder: "Type anything to search",
                  }}
                  columnFilter
                  onRowClick={(item) => history.push(`/users/${item.id}`)}
                  scopedSlots={{
                    email: (item) => <td>{item.email || ""}</td>,
                    isActive: (item) => (
                      <td>
                        <CBadge color={getBadge(item.isActive)}>
                          {item.isActive ? "active" : "banned"}
                        </CBadge>
                      </td>
                    ),
                    createdOn: (item) => (
                      <td>
                        {format(new Date(item.createdOn), "dd-MM-yyyy H:mm")}
                      </td>
                    ),
                  }}
                />
                <CPagination
                  activePage={data?.pageIndex}
                  onActivePageChange={pageChange}
                  pages={data?.totalPages}
                  doubleArrows
                  align="center"
                />
              </Skeleton>
            </CCardBody>
          </CCard>
        </Spin>
      </CCol>
    </CRow>
  );
};

export default Users;
