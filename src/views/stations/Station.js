import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { callApi } from '../../utils/apiCaller'

const Station = ({ match }) => {
  const station = useSelector(state => state.station.data.sources.find(u => u.id === match.params.id));
  const stationDetails = station ? Object.entries(station) : [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" />Not found</span>)]]
  const [orders, setOrders] = useState([])
  const [services, setServices] = useState([])

  const fetchStationOrders = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTE1OTgxMTEwIiwianRpIjoiNWE2Y2FlMzAtZmUyOS00MDZhLWJlYTgtZjM0MTFlODcxNzMzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwOTE1OTgxMTEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE1OTU1ODI4MzcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSJ9.xbHaI2XcaoHPDSh24NrJwe_c9WY9Cv8ZLJA7j6CNsKA"
      const response = await callApi(`orders/stations/${station.id}`, "GET", null, token)
      setOrders(response.data.sources)
    } catch (e) {
      console.log("fetchOrders -> e", e)
    }
  }

  const fetchStationServices = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTE1OTgxMTEwIiwianRpIjoiNWE2Y2FlMzAtZmUyOS00MDZhLWJlYTgtZjM0MTFlODcxNzMzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwOTE1OTgxMTEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE1OTU1ODI4MzcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSJ9.xbHaI2XcaoHPDSh24NrJwe_c9WY9Cv8ZLJA7j6CNsKA"
      const response = await callApi(`stations/${station.id}`, "GET", null, token)
      setServices(response.data.services)
    } catch (e) {
      console.log("fetchOrders -> e", e)
    }
  }

  useEffect(() => {
    fetchStationOrders()
    fetchStationServices()
  }, [])

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
              Station id: {match.params.id}
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {
                  stationDetails.map(([key, value], index) => {
                    return (
                      <tr key={index.toString()}>
                        <td><strong>{`${key}:`}</strong></td>
                        <td>{value}</td>
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
            Station's Orders
          </CCardHeader>
          <CCardBody>
            <table className="table table-hover">
              <tbody>
                {
                  orders.map((order, index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{order.id}</td>
                        <td>{order.name}</td>
                        <td>{order.address}</td>
                        <td>{order.vehicle}</td>
                        <td>{order.isAvailable}</td>
                        <td>{order.hasAmbulatory}</td>
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
                  services.map((service, index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{service.name}</td>
                        <td>{service.description}</td>
                        <td>{service.thumbnail}</td>
                        <td>{service.price}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Station
