import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CLink } from '@coreui/react'
import { callApi } from '../../utils/apiCaller'
import { format } from 'date-fns';
import { Spin, Skeleton } from 'antd';

const Station = ({ match }) => {

  const [id] = useState(match.params.id);
  const [station, setStation] = useState();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([])

  useEffect(() => {
    
    const fetchStationOrders = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTE1OTgxMTEwIiwianRpIjoiNWE2Y2FlMzAtZmUyOS00MDZhLWJlYTgtZjM0MTFlODcxNzMzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwOTE1OTgxMTEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE1OTU1ODI4MzcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSJ9.xbHaI2XcaoHPDSh24NrJwe_c9WY9Cv8ZLJA7j6CNsKA"
        const response = await callApi(`orders/stations/${id}`, "GET", null, token)
        setOrders(response.data.sources)
      } catch (e) {
        console.log("fetchOrders -> e.response", e.response)
      }
      setLoading(false)
    }

    const fetchStation = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTE1OTgxMTEwIiwianRpIjoiNWE2Y2FlMzAtZmUyOS00MDZhLWJlYTgtZjM0MTFlODcxNzMzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwOTE1OTgxMTEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE1OTU1ODI4MzcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSJ9.xbHaI2XcaoHPDSh24NrJwe_c9WY9Cv8ZLJA7j6CNsKA"
        const response = await callApi(`stations/${id}`, "GET", null, token)
        setStation(response.data)
      } catch (e) {
        console.log("fetchOrders -> e.response", e.response)
      }
      setLoading(false)
    }

    fetchStation()
    fetchStationOrders()
  }, [id])

  return (
    <CRow>
      <CCol lg={12}>
        <Spin tip="Loading..." size="large" spinning={loading}>
          <CCard>
            <CCardHeader>
              Station id: {id}
            </CCardHeader>
            <CCardBody>
              <Skeleton loading={loading}>
                {station ?
                  <table className="table table-striped table-hover">
                    <tbody>
                      <tr>
                        <td>Name: </td>
                        <td>{station.name}</td>
                      </tr>
                      <tr>
                        <td>Owner Name: </td>
                        <td>{station.owner.name}</td>
                      </tr>
                      <tr>
                        <td>Owner Phone: </td>
                        <td>{station.owner.phoneNumber}</td>
                      </tr>
                      <tr>
                        <td>Address: </td>
                        <td>
                          <CLink to={`https://www.google.com/maps/place/${station.latitude},${station.longitude}`} rel="noopener norefferer" target="_blank">
                            {station.address}
                          </CLink>
                        </td>
                      </tr>
                      <tr>
                        <td>Vehicle: </td>
                        <td>{station.vehicle}</td>
                      </tr>
                      <tr>
                        <td>Has Ambulatory: </td>
                        <td>{station.hasAmbulatory ? "True" : "False"}</td>
                      </tr>
                      <tr>
                        <td>Is Available: </td>
                        <td>{station.isAvailable ? "True" : "False"}</td>
                      </tr>
                      {station.hasAmbulatory && <tr>
                        <td>Coefficient Ambulatory: </td>
                        <td>{station.coefficient}</td>
                      </tr>}
                      <tr>
                        <td>Created On: </td>
                        <td>{format(new Date(station.createdOn), "dd-MM-yyyy H:mm")}</td>
                      </tr>
                    </tbody>
                  </table>
                  : "Not Found"
                }
              </Skeleton>
            </CCardBody>
          </CCard>
        </Spin>
      </CCol>
      {station &&
        <>
          <CCol lg={12}>
            <CCard>
              <CCardHeader>
                Station's Orders
              </CCardHeader>
              <CCardBody>
                <table className="table table-hover">
                  <tbody>
                    {
                      orders.map((order, index) => {
                        return (
                          <tr key={index.toString()}>
                            <td>{index + 1}</td>
                            <td>{order.customerName}</td>
                            <td>{order.address}</td>
                            <td>{order.vehicle}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.useAmbulatory}</td>
                            <td>{order.status}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol lg={12}>
            <CCard>
              <CCardHeader>
                Station's Services:
              </CCardHeader>
              <CCardBody>
                <table className="table table-striped table-hover">
                  <tbody>
                    {
                      station?.services?.map((service, index) => {
                        return (
                          <tr key={index.toString()}>
                            <td>{index + 1}</td>
                            <td>{service.name}</td>
                            <td>{service.price}</td>
                            <td>{service.description}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </>
      }
    </CRow>
  )
}

export default Station