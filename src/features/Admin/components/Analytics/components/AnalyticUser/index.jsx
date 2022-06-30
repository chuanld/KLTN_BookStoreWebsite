import React, { useCallback, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import adminApi from 'api/adminApi'
import UserRegister from './UserRegister'
import FormDate from '../../common/FormDate'

import * as XLSX from 'xlsx'
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)
var quarterOfYear = require('dayjs/plugin/quarterOfYear')
dayjs.extend(quarterOfYear)

const initTypeDistance = {
  years: 'years',
  quarters: 'quarters',
  months: 'months',
  weeks: 'weeks',
  days: 'days',
}
const options = ['years', 'quarters', 'months', 'days']
function AnalyticUser() {
  const formatDate = (date, month, year) => {
    let set = `${year}-${month > 9 ? month : '0' + month}-${
      date > 9 ? date : '0' + date
    }`
    return set
  }
  const today = new Date()
  const initialDate = {
    from: formatDate(
      today.getDate(),
      today.getMonth(),
      today.getFullYear() - 1
    ),
    to: formatDate(
      today.getDate() + 1,
      today.getMonth() + 1,
      today.getFullYear()
    ),
  }
  const [start, setStart] = useState(initialDate.from)
  const [end, setEnd] = useState(initialDate.to)
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])

  const [totalUser, setTotalUser] = useState(0)
  const [totalOrder, setTotalOrder] = useState(0)

  const [loading, setLoading] = useState(false)

  const [distanceType, setDistanceType] = useState(initTypeDistance.months)
  const [distanceTimeLine, setDistanceTimeLine] = useState([])
  const [callback, setCallback] = useState(false)
  const Now = dayjs()
  const [isFirstTime, setIsFirstTime] = useState(true)

  const getAnalytics = async () => {
    try {
      setLoading(true)
      const res = await adminApi.getAnalytic(start, end)
      setOrders(handleOrderData(res.orders))

      setUsers(handleUserData(res.users))
      setIsFirstTime(false)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    getAnalytics()
  }, [callback])

  const handleUserData = (usersDt) => {
    if (usersDt.length === 0) return
    var userList = []
    var totalUsers = 0

    // if (distanceTimeLine.length === 0) {
    const values = {
      analyStart: start,
      analyEnd: end,
    }
    const date1 = dayjs(values.analyStart)
    const date2 = dayjs(values.analyEnd)
    setStart(dayjs(values.analyStart).format('YYYY-MM-DD'))
    setEnd(dayjs(values.analyEnd).format('YYYY-MM-DD'))
    let distance = 0
    let arrDistance = []
    let formatDistance = ''
    if (distanceType === 'years') {
      distance = date2.diff(date1, 'year')
      arrDistance = [Now.format('YYYY')]
      formatDistance = 'YYYY'
    } else if (distanceType === 'quarters') {
      distance = date2.diff(date1, 'quarter')
      arrDistance = [Now.format('Q-YYYY')]
      formatDistance = 'Q-YYYY'
    } else if (distanceType === 'months') {
      distance = date2.diff(date1, 'month')
      arrDistance = [Now.format('MMM-YY')]
      formatDistance = 'MMM-YY'
    } else if (distanceType === 'weeks') {
      distance = date2.diff(date1, 'week')
      arrDistance = [Now.format('YYYY')]
      formatDistance = 'YYYY'
    } else {
      distance = date2.diff(date1, 'day')
      arrDistance = [Now.format('dd-DD')]
      formatDistance = 'dd-DD'
    }

    for (let i = 1; i < distance; i++) {
      arrDistance.unshift(Now.subtract(i, distanceType).format(formatDistance))
    }
    arrDistance.forEach((tl) => {
      var elem = {}
      var totals = 0

      usersDt.forEach((user) => {
        var total = 0

        if (distanceType === 'years') {
          if (dayjs(user.createdAt).format('YYYY') === tl) {
            total += 1
          }
        } else if (distanceType === 'quarters') {
          if (dayjs(user.createdAt).format('Q-YYYY') === tl) {
            total += 1
          }
        } else if (distanceType === 'months') {
          if (dayjs(user.createdAt).format('MMM-YY') === tl) {
            total += 1
          }
        } else if (distanceType === 'days') {
          if (dayjs(user.createdAt).format('dd-DD') === tl) {
            total += 1
          }
        }

        totals += total
      })

      elem.moment = tl
      elem.count = totals
      totalUsers += totals
      userList.push(elem)
    })
    console.log(userList, 'usersssssssssssssss')
    setTotalUser(totalUsers)
    return userList
    // }
  }

  const handleOrderData = (ordersDt) => {
    if (ordersDt.length === 0) return
    var orderList = []
    var totalOrders = 0

    // if (distanceTimeLine.length === 0) {
    const values = {
      analyStart: start,
      analyEnd: end,
    }
    const date1 = dayjs(values.analyStart)
    const date2 = dayjs(values.analyEnd)
    setStart(dayjs(values.analyStart).format('YYYY-MM-DD'))
    setEnd(dayjs(values.analyEnd).format('YYYY-MM-DD'))
    let distance = 0
    let arrDistance = []
    let formatDistance = ''
    if (distanceType === 'years') {
      distance = date2.diff(date1, 'year')
      arrDistance = [Now.format('YYYY')]
      formatDistance = 'YYYY'
    } else if (distanceType === 'quarters') {
      distance = date2.diff(date1, 'quarter')
      arrDistance = [Now.format('Q-YYYY')]
      formatDistance = 'Q-YYYY'
    } else if (distanceType === 'months') {
      distance = date2.diff(date1, 'month')
      arrDistance = [Now.format('MMM-YY')]
      formatDistance = 'MMM-YY'
    } else if (distanceType === 'weeks') {
      distance = date2.diff(date1, 'week')
      arrDistance = [Now.format('YYYY')]
      formatDistance = 'YYYY'
    } else {
      distance = date2.diff(date1, 'day')
      arrDistance = [Now.format('dd-DD')]
      formatDistance = 'dd-DD'
    }

    for (let i = 1; i < distance; i++) {
      arrDistance.unshift(Now.subtract(i, distanceType).format(formatDistance))
    }
    arrDistance.forEach((tl) => {
      var elem = {}
      var totals = 0

      ordersDt.forEach((ord) => {
        var total = 0
        if (ord.status !== 6) return
        if (distanceType === 'years') {
          if (dayjs(ord.updatedAt).format('YYYY') === tl) {
            total += 1
          }
        } else if (distanceType === 'quarters') {
          if (dayjs(ord.updatedAt).format('Q-YYYY') === tl) {
            total += 1
          }
        } else if (distanceType === 'months') {
          if (dayjs(ord.updatedAt).format('MMM-YY') === tl) {
            total += 1
          }
        } else if (distanceType === 'days') {
          if (dayjs(ord.updatedAt).format('dd-DD') === tl) {
            total += 1
          }
        }

        totals += total
      })

      elem.moment = tl
      elem.count = totals
      totalOrders += totals
      orderList.push(elem)
    })

    setTotalOrder(totalOrders)
    return orderList
    // }
    // distanceTimeLine.forEach((tl) => {
    //   var elem = {}
    //   var totals = 0

    //   ordersDt.forEach((user) => {
    //     var total = 0
    //     if (distanceType === 'years') {
    //       if (dayjs(user.createdAt).format('YYYY') === tl) {
    //         total += 1
    //       }
    //     } else if (distanceType === 'quarters') {
    //       if (dayjs(user.createdAt).format('Q-YYYY') === tl) {
    //         total += 1
    //       }
    //     } else if (distanceType === 'months') {
    //       if (dayjs(user.createdAt).format('MMM-YY') === tl) {
    //         total += 1
    //       }
    //     } else if (distanceType === 'days') {
    //       if (dayjs(user.createdAt).format('dd-DD') === tl) {
    //         total += 1
    //       }
    //     }

    //     totals += total
    //   })

    //   elem.moment = tl
    //   elem.count = totals
    //   totalOrders += totals
    //   orderList.push(elem)
    // })

    // setTotalOrder(totalOrders)
    // return orderList
  }

  const handleTimeLine = (values) => {
    const date1 = dayjs(values.analyStart)
    const date2 = dayjs(values.analyEnd)
    setStart(dayjs(values.analyStart).format('YYYY-MM-DD'))
    setEnd(dayjs(values.analyEnd).format('YYYY-MM-DD'))
    let distance = 0
    let arrDistance = []
    let formatDistance = ''
    if (distanceType === 'years') {
      distance = date2.diff(date1, 'year')
      arrDistance = [Now.format('YYYY')]
      formatDistance = 'YYYY'
    } else if (distanceType === 'quarters') {
      distance = date2.diff(date1, 'quarter')
      arrDistance = [Now.format('Q-YYYY')]
      formatDistance = 'Q-YYYY'
    } else if (distanceType === 'months') {
      distance = date2.diff(date1, 'month')
      arrDistance = [Now.format('MMM-YY')]
      formatDistance = 'MMM-YY'
    } else if (distanceType === 'weeks') {
      distance = date2.diff(date1, 'week')
      arrDistance = [Now.format('YYYY')]
      formatDistance = 'YYYY'
    } else {
      distance = date2.diff(date1, 'day')
      arrDistance = [Now.format('dd-DD')]
      formatDistance = 'dd-DD'
    }

    for (let i = 1; i < distance; i++) {
      arrDistance.unshift(Now.subtract(i, distanceType).format(formatDistance))
    }
    setDistanceTimeLine(arrDistance)
    if (!isFirstTime) setCallback(!callback)
  }
  const handleChangeGroupBy = (value) => {
    setDistanceType(value)
  }

  //export
  const handleExport = () => {
    var exc = XLSX.utils.book_new()
    var sheet = XLSX.utils.json_to_sheet(users)

    sheet['!cols'] = [
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 10 },
      { width: 25 },
      { width: 15 },
      { width: 5 },
      { width: 20 },
    ]

    XLSX.utils.book_append_sheet(exc, sheet, 'Doanh Thu')
    XLSX.utils.sheet_add_aoa(sheet, [['Mã']], { origin: 'A1' })
    XLSX.utils.sheet_add_aoa(sheet, [['Tên Danh mục']], { origin: 'B1' })

    // const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);

    XLSX.utils.sheet_add_aoa(sheet, [['Doanh thu tổng']], { origin: 'E1' })
    XLSX.utils.sheet_add_aoa(sheet, [['Tổng thu (COD)']], { origin: 'E2' })
    XLSX.utils.sheet_add_aoa(sheet, [[`Tổng thu (Paypal)`]], { origin: 'E3' })
    XLSX.utils.sheet_add_aoa(sheet, [[`Tổng thu (VnPay)`]], { origin: 'E4' })

    var sheet1 = XLSX.utils.json_to_sheet(orders)
    XLSX.utils.book_append_sheet(exc, sheet1, 'Doanh số đơn')
    sheet1['!cols'] = [{ width: 25 }, { width: 20 }]
    XLSX.utils.sheet_add_aoa(sheet1, [['Tình trạng đơn hàng']], {
      origin: 'A1',
    })

    XLSX.utils.sheet_add_aoa(sheet1, [['Đơn hàng thành công']], {
      origin: 'A2',
    })
    XLSX.utils.sheet_add_aoa(sheet1, [['Đơn hàng đang chờ']], { origin: 'A3' })
    XLSX.utils.sheet_add_aoa(sheet1, [['Đơn hàng đã hủy']], { origin: 'A4' })

    // XLSX.utils.sheet_add_aoa(sheet, [[data.data?.users.length]], {
    //   origin: 'I1',
    // })
    // XLSX.utils.sheet_add_aoa(
    //   sheet,
    //   [[data.data?.users.filter((x) => x.protocol === 0).length]],
    //   { origin: 'I2' }
    // )
    // XLSX.utils.sheet_add_aoa(
    //   sheet,
    //   [[data.data?.users.filter((x) => x.protocol === 1).length]],
    //   { origin: 'I3' }
    // )
    // XLSX.utils.sheet_add_aoa(
    //   sheet,
    //   [[data.data?.users.filter((x) => x.protocol === 2).length]],
    //   { origin: 'I4' }
    // )

    XLSX.writeFile(
      exc,
      `Doanhthu-tu-${start !== '' ? start : '--/--/----'}-den-${
        end !== '' ? end : '--/--/----'
      }.xlsx`
    )
  }
  return (
    <div className="analytic-chart-section">
      <FormDate
        onSubmit={handleTimeLine}
        loading={loading}
        from={start}
        to={end}
        distanceType={distanceType}
        options={options}
        onSubmitChange={handleChangeGroupBy}
      />
      <div className="chart-container">
        <div className="chart-line-item">
          {/* <OrderSummary orderSummary={orderSummary} totalOrd={totalOrd} /> */}
          <UserRegister
            // arrMonth={arrMonth}
            distanceTimeLine={distanceTimeLine}
            users={users}
            orders={orders}
            totalUser={totalUser}
            totalOrder={totalOrder}
          />
        </div>
      </div>
      {/* <div className="chart-info-detail">Details</div> */}
    </div>
  )
}

export default AnalyticUser
