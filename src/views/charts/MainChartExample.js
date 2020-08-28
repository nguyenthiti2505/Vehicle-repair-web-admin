import React, { useEffect, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils/src'
import { callApi } from '../../utils/apiCaller'
import { Spin, DatePicker } from 'antd'
import { CCard, CCardBody, CRow, CCol, CButton, CButtonGroup } from '@coreui/react'
import { format } from "date-fns"

const { RangePicker } = DatePicker;

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartExample = attributes => {

  const [loading, setLoading] = useState(true)

  const [chartType, setChartType] = useState("Range")

  const [chartData, setChartData] = useState()

  const onChangeDate = (date, dateString) => {
    if (dateString) {
      fetchChartData({ chartType, fromDate: format(new Date(dateString), "MM-dd-yyyy") })
    }
  }

  const onChangeRange = (range) => {
    if (range) {
      const fromDate = format(new Date(range[0]), "MM-dd-yyyy")
      const toDate = format(new Date(range[1]), "MM-dd-yyyy")
      fetchChartData({ chartType, fromDate, toDate })
    }
  }

  const fetchChartData = async (params = {}) => {
    setLoading(true)
    const { chartType, fromDate, toDate } = params
    const token = localStorage.getItem("_token")
    try {
      const response = await callApi(`dashboard/chart?chartType=${chartType || "Range"}&fromDate=${fromDate}&toDate=${toDate}`, "GET", null, token)
      setChartData(response.data.data)
    } catch (error) {
      console.log("fetchChartData -> error", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchChartData()
  }, [])

  const defaultDatasets = (() => {
    return [
      {
        label: 'New Orders',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: chartData?.orderData || []
      },
      {
        label: 'New Users',
        backgroundColor: hexToRgba(brandSuccess, 10),
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: chartData?.userData || []
      },
      {
        label: 'New Stations',
        backgroundColor: hexToRgba(brandDanger, 10),
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 2,
        data: chartData?.stationData || []
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
            stepSize: Math.ceil(10),
            max: chartData?.chartHeight || 50
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
    <CCard  className="traffic">
      <CCardBody>
        <CRow className="chart">
          <CCol sm="4">
            <h4 id="traffic" className="card-title mb-0">Traffic</h4>
            <div className="small text-muted">{chartData && `From ${chartData?.fromDate} to ${chartData?.toDate}`}</div>
          </CCol>
          <CCol sm="8" className="d-none d-md-block">
            <CButtonGroup className="float-right">
              {
                ['Range', 'Month', 'Year'].map(value => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    onClick={() => setChartType(value)}
                    active={value === chartType}
                  >
                    {value}
                  </CButton>
                ))
              }
            </CButtonGroup>
            <div className="float-right mr-3">
              {chartType === "Range" ?
                <RangePicker format="MM-DD-yyyy" disabledDate={date => date >= new Date()} onChange={onChangeRange} /> :
                <DatePicker disabledDate={date => date >= new Date()} onChange={onChangeDate} picker={chartType.toLowerCase()} />
              }
            </div>
          </CCol>
        </CRow>
        <Spin spinning={loading}>
          <CChartLine
            {...attributes}
            datasets={defaultDatasets}
            options={defaultOptions}
            labels={chartData?.labels || []}
          />
        </Spin>
      </CCardBody>
    </CCard>
  )
}

export default MainChartExample