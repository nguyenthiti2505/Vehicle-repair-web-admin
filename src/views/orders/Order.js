import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLink,
} from "@coreui/react";
import { callApi } from "../../utils/apiCaller";
import { format } from "date-fns";
import { Spin, Skeleton } from "antd";

const Order = ({ match }) => {
  const [id] = useState(match.params.id);
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("_token");
        const response = await callApi(`orders/${id}`, "GET", null, token);
        setOrder(response.data);
      } catch (e) {
        console.log("fetchOrders -> e.response", e.response);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  return (
    <CRow>
      <CCol lg={12}>
        <Spin tip="Loading..." size="large" spinning={loading}>
          <CCard>
            <CCardHeader>Order Id: {id}</CCardHeader>
            <CCardBody>
              <Skeleton loading={loading}>
                {order ? (
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr>
                        <td>Customer Name: </td>
                        <td>{order.customerName}</td>
                      </tr>
                      <tr>
                        <td>Customer Phone: </td>
                        <td>{order.customerPhone}</td>
                      </tr>
                      <tr>
                        <td>Station Name: </td>
                        <td>{order.station.name}</td>
                      </tr>
                      <tr>
                        <td>Address: </td>
                        <td>
                          <CLink
                            to={`https://www.google.com/maps/place/${order.latitude},${order.longitude}`}
                            rel="noopener norefferer"
                            target="_blank"
                          >
                            {order.address}
                          </CLink>
                        </td>
                      </tr>
                      <tr>
                        <td>User Ambulatory: </td>
                        <td>{order.useAmbulatory ? "True" : "False"}</td>
                      </tr>
                      <tr>
                        <td>Status: </td>
                        <td>{order.status}</td>
                      </tr>
                      {order.useAmbulatory && (
                        <tr>
                          <td>Ambulatory Fee: </td>
                          <td>{order.ambulatoryFee}</td>
                        </tr>
                      )}
                      <tr>
                        <td>Total Price: </td>
                        <td>{order.totalPrice}</td>
                      </tr>
                      <tr>
                        <td>Created On: </td>
                        <td>
                          {format(new Date(order.createdOn), "dd-MM-yyyy H:mm")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  "Not Found"
                )}
              </Skeleton>
            </CCardBody>
          </CCard>
        </Spin>
      </CCol>
      {order && (
        <>
          <CCol lg={12}>
            <CCard>
              <CCardHeader>Customer's Services:</CCardHeader>
              <CCardBody>
                <table className="table table-striped table-hover">
                  <tbody>
                    {order?.services?.map((service, index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{index + 1}</td>
                          <td>{service.name}</td>
                          <td>{service.price}</td>
                          <td>{service.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </>
      )}
    </CRow>
  );
};

export default Order;
