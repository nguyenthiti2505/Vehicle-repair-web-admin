import React, { useEffect, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils/src'
import { callApi } from '../../utils/apiCaller'
import { getDay, subDays, format } from 'date-fns'
import { Spin } from 'antd'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartExample = attributes => {

  // 1
  const getAndSetOrderData = (orders = []) => {
    let data = []
    for (let i = 0; i < days; i++) {
      const date = subDays(new Date(), i).setHours(0, 0, 0, 0)
      data.push(orders.filter(o => new Date(o.createdOn).setHours(0, 0, 0, 0) === date).length)
    }
    setOrderData(data.reverse())
  }

  // 2
  const getAndSetUserData = (users = []) => {
    let data = []
    for (let i = 0; i < days; i++) {
      const date = subDays(new Date(), i).setHours(0, 0, 0, 0)
      data.push(users.filter(u => new Date(u.createdOn).setHours(0, 0, 0, 0) === date).length)
    }
    setUserData(data.reverse())
  }

  // 3
  const getAndSetStationData = (stations = []) => {
    let data = []
    for (let i = 0; i < days; i++) {
      const date = subDays(new Date(), i).setHours(0, 0, 0, 0)
      data.push(stations.filter(s => new Date(s.createdOn).setHours(0, 0, 0, 0) === date).length)
    }
    setStationData(data.reverse())
  }

  // Hàm 1, 2, 3 có thể customize lại thành 1 hàm

  const getDayOfWeek = (date = 0) => {
    switch (date) {
      case 1:
        return "Monday"
      case 2:
        return "Tuesday"
      case 3:
        return "Wednesday"
      case 4:
        return "Thursday"
      case 5:
        return "Friday"
      case 6:
        return "Saturday"
      default:
        return "Sunday"
    }
  }

  const getAndSetLabels = () => {
    let labels = []
    for (let i = 0; i < days; i++) {
      const date = getDay(subDays(new Date(), i))
      labels.push(getDayOfWeek(date))
    }
    setLabels(labels.reverse())
  }

  const [loading, setLoading] = useState(true)

  const [days] = useState(7)

  const [chartHeight] = useState(50)

  const [startDate] = useState(subDays(new Date(), days))

  const [orderData, setOrderData] = useState([])

  const [userData, setUserData] = useState([])

  const [stationData, setStationData] = useState([])

  const [labels, setLabels] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("_token")
      const response = await callApi(`dashboard/orders?pageSize=1000&fromDate=${format(startDate, "MM-dd-yyyy")}`, "GET", null, token)
      const orders = response.data.sources
      getAndSetOrderData(orders)
    }
    const fetchUsers = async () => {
      const token = localStorage.getItem("_token")
      const response = await callApi(`dashboard/users?pageSize=1000&fromDate=${format(startDate, "MM-dd-yyyy")}`, "GET", null, token)
      const users = response.data.sources
      getAndSetUserData(users)
    }
    const fetchStations = async () => {
      const token = localStorage.getItem("_token")
      const response = await callApi(`dashboard/stations?pageSize=1000&fromDate=${format(startDate, "MM-dd-yyyy")}`, "GET", null, token)
      const stations = response.data.sources
      getAndSetStationData(stations)
      setLoading(false)
    }
    getAndSetLabels()
    fetchOrders()
    fetchUsers()
    fetchStations()
  }, [])

  const defaultDatasets = (() => {
    return [
      {
        label: 'New Orders',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: orderData
      },
      {
        label: 'New Users',
        backgroundColor: hexToRgba(brandSuccess, 10),
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: userData
      },
      {
        label: 'New Stations',
        backgroundColor: hexToRgba(brandDanger, 10),
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 2,
        data: stationData
      }
    ]
  })()

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(chartHeight / 5),
            max: chartHeight
          },
          gridLines: {
            display: true
          }
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    }
  }
  )()

  // render
  return (
    <Spin spinning={loading}>
      <CChartLine
        {...attributes}
        datasets={defaultDatasets}
        options={defaultOptions}
        labels={labels}
      />
    </Spin>
  )
}


export default MainChartExample
