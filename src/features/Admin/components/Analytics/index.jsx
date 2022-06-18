import Breadcrumb from 'components/Breadcrumbs'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './styles.css'
import adminApi from 'api/adminApi'
import IncomeCate from './components/Overview/IncomCate'

import IncomePayment from './components/Overview/IncomePayment'
import dayjs from 'dayjs'
import OrderSummary from './components/Overview/OrderSummary'
import OverviewChart from './components/Overview'
import AnalyticUser from './components/AnalyticUser'

function Analytics() {
  const today = new Date()
  const formatDate = (date, month, year) => {
    let set = `${year}-${month > 9 ? month : '0' + month}-${
      date > 9 ? date : '0' + date
    }`
    return set
  }

  const Now = dayjs()
  const arrMonth = [Now.format('MMMM')]
  const arrDay = [Now.format('dddd')]

  for (let i = 1; i < 15; i++) {
    arrMonth.unshift(Now.subtract(i, 'month').format('MMMM'))
    arrDay.unshift(Now.subtract(i, 'day').format('dddd'))
  }

  const initialDate = {
    from: formatDate(
      today.getDate(),
      today.getMonth(),
      today.getFullYear() - 1
    ),
    to: formatDate(today.getDate(), today.getMonth() + 1, today.getFullYear()),
  }
  const [start, setStart] = useState(initialDate.from)
  const [end, setEnd] = useState(initialDate.to)
  const [data, setData] = useState([])
  const [cate, setCate] = useState([])
  const [orderSummary, setOrderSummary] = useState([])
  const [paymentType, setPaymentType] = useState({
    COD: 0,
    Paypal: 0,
    // Vnpay: 0,
  })
  const [totalOrd, setTotalOrd] = useState(0)
  const [totalPm, setTotalPm] = useState(0)

  const getAnalytics = async () => {
    const res = await adminApi.getAnalytic(start, end)

    setData(res)
    setOrderSummary(statusOrderCalculateTotal(res))
    // priceCalculateTotalMeMo(res);
    setCate(priceCalculateTotal(res))
    paymentCalculateTotal(res)
  }
  const priceCalculateTotal = (data) => {
    if (data.categories && data.vouchers) {
      var categoryList = []
      var totalPayment = 0
      data.categories?.forEach((cta, id) => {
        var elem = {}
        const orders = data.orders?.filter((x) => {
          if (x.status === 5)
            return x.cart?.filter((y) => y.category === cta.name).length > 0
        })
        var totals = 0
        var discou = 0
        if (orders?.length > 0) {
          orders?.forEach((item, index) => {
            var total = 0
            var discount = 0

            total = item.cart
              ?.filter((x) => x.category === cta.name)
              .reduce((prev, item) => {
                return prev + item.price * item.quantity
              }, 0)
            // if (item.voucherCode) {
            //   discount = getVoucher(item.voucherCode,data.data.vouchers);
            // }else{
            //   discount =0 ;
            // }
            discou = discount
            totals += total - total * (discount / 100)
          })
        }
        elem.cateID = cta._id
        elem.cateName = cta.name
        elem.income = totals
        elem.discount = discou
        totalPayment += totals
        categoryList.push(elem)
      })
      setTotalPm(totalPayment)

      return categoryList
    }
  }

  const statusOrderCalculateTotal = (data) => {
    if (data.orders && data.vouchers) {
      var orderStatusList = []
      var countInProgress = 0
      var countComplete = 0
      var countCancel = 0
      var objCancel = {}
      var objInProg = {}
      var objCompl = {}
      var total = 0
      data.orders?.forEach((cta, id) => {
        if (cta.status === 1) {
          objCancel.status = 'Cancel'
          objCancel.count = countCancel += 1
        } else if (cta.status === 5) {
          objCompl.status = 'Complete'
          objCompl.count = countComplete += 1
        } else {
          objInProg.status = 'In Progress'
          objInProg.count = countInProgress += 1
        }
        total += 1
      })
      orderStatusList = [objCompl, objInProg, objCancel]
      setTotalOrd(total)
      return orderStatusList
    }
  }
  console.log(cate, 'catte')
  const paymentCalculateTotal = (data) => {
    if (data?.orders && data?.vouchers) {
      var totalPaypal = 0
      var totalCOD = 0
      data?.orders.forEach((item, index) => {
        var total = 0
        var discount = 0
        total = item.cart?.reduce((prev, item) => {
          return prev + item.price * item.quantity
        }, 0)

        // if (item.voucherCode) {
        //   discount = getVoucher(item.voucherCode,data.data?.vouchers);
        // }
        if (item.orderID.includes('ShipCOD')) {
          totalCOD += total - (total * discount) / 100
        } else if (item.orderID.includes('PAYID')) {
          totalPaypal += total - (total * discount) / 100
        }
      })
      setPaymentType({
        COD: totalCOD,
        Paypal: totalPaypal,
        // Vnpay: 0,
      })
    }
  }

  useEffect(() => {
    getAnalytics()

    // priceCalculateTotalMeMo(data);
  }, [])

  return (
    <>
      <div className="session-heading">
        <Breadcrumb />
      </div>
      <div className="analytic">
        <div className="analytic-navbar">
          <div className="analytic-navbar-title">Overview Charts</div>
          <div className="analytic-navbar-title">Revenue Summary</div>
          <div className="analytic-navbar-title">Visitor</div>
        </div>
        <div className="analytic-chart">
          <OverviewChart />
          <AnalyticUser />
        </div>
      </div>
    </>
  )
}

export default Analytics
