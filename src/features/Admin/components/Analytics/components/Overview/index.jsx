import React, { useCallback, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import IncomeCate from './IncomCate'
import IncomePayment from './IncomePayment'
import OrderSummary from './OrderSummary'
import adminApi from 'api/adminApi'
import FormDate from '../../common/FormDate'

import * as XLSX from 'xlsx'

function OverviewChart() {
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

  const [loading, setLoading] = useState(false)
  const [start, setStart] = useState('2020-10-22')
  const [end, setEnd] = useState('')
  const [callbackTime, setCallbackTime] = useState(false)
  const [cate, setCate] = useState([])
  const [orderSummary, setOrderSummary] = useState([])
  const [paymentType, setPaymentType] = useState({
    COD: 0,
    Paypal: 0,
  })
  const [totalOrd, setTotalOrd] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalPm, setTotalPm] = useState(0)

  const getAnalytics = async () => {
    try {
      setLoading(true)
      const res = await adminApi.getAnalytic(start, end)

      setStart(res.date?.from)
      setEnd(res.date?.to)

      setOrderSummary(statusOrderCalculateTotal(res))

      setCate(priceCalculateTotal(res))
      paymentCalculateTotal(res)
    } catch (err) {
      console.log(err.response.data.msg)
    }
    setLoading(false)
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

  const paymentCalculateTotal = (data) => {
    if (data?.orders && data?.vouchers) {
      var totalPaypal = 0
      var totalCOD = 0
      var totalPayment = 0
      data?.orders.forEach((item, index) => {
        var total = 0
        var discount = 0

        total = item.cart?.reduce((prev, item) => {
          return prev + item.price * item.quantity
        }, 0)

        // if (item.voucherCode) {
        //   discount = getVoucher(item.voucherCode,data.data?.vouchers);
        // }
        if (item.orderID.includes('ShipCOD') && item.status === 5) {
          totalCOD += total - (total * discount) / 100
        } else if (item.orderID.includes('PAYID') && item.status === 5) {
          totalPaypal += total - (total * discount) / 100
        }
        totalPayment += 1
      })
      setTotalPayment(totalPayment)
      setPaymentType({
        COD: totalCOD,
        Paypal: totalPaypal,
        // Vnpay: 0,
      })
    }
  }

  const handleSubmitTimeFilter = (values) => {
    console.log(values, 'time filter')
    setStart(values.analyStart)
    setEnd(values.analyEnd)
    setCallbackTime(!callbackTime)
  }

  useEffect(() => {
    getAnalytics()

    // priceCalculateTotalMeMo(data);
  }, [callbackTime])

  const handleExport = () => {
    var exc = XLSX.utils.book_new()
    var sheet = XLSX.utils.json_to_sheet(cate)

    sheet['!cols'] = [
      { width: 25 },
      { width: 20 },
      { width: 30 },
      { width: 5 },
      { width: 30 },
      { width: 15 },
      { width: 5 },
      { width: 20 },
    ]

    XLSX.utils.book_append_sheet(exc, sheet, 'DoanhThu')
    XLSX.utils.sheet_add_aoa(sheet, [['Mã']], { origin: 'A1' })
    XLSX.utils.sheet_add_aoa(sheet, [['Tên Danh mục']], { origin: 'B1' })
    XLSX.utils.sheet_add_aoa(sheet, [[`Doanh thu (tổng ${totalPm})`]], {
      origin: 'C1',
    })

    // const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);

    XLSX.utils.sheet_add_aoa(sheet, [['Doanh thu tổng']], { origin: 'E1' })
    XLSX.utils.sheet_add_aoa(sheet, [['Tổng thu (COD)']], { origin: 'E2' })
    XLSX.utils.sheet_add_aoa(sheet, [[`Tổng thu (Paypal)`]], { origin: 'E3' })

    XLSX.utils.sheet_add_aoa(sheet, [[totalPm]], { origin: 'F1' })
    XLSX.utils.sheet_add_aoa(sheet, [[paymentType.COD]], { origin: 'F2' })
    XLSX.utils.sheet_add_aoa(sheet, [[paymentType.Paypal]], { origin: 'F3' })

    var sheet1 = XLSX.utils.json_to_sheet(orderSummary)
    XLSX.utils.book_append_sheet(exc, sheet1, 'Đơn hàng')
    sheet1['!cols'] = [{ width: 25 }, { width: 20 }]
    XLSX.utils.sheet_add_aoa(sheet1, [['Tình trạng đơn hàng']], {
      origin: 'A1',
    })
    XLSX.utils.sheet_add_aoa(sheet1, [[`Tổng số lượng ${totalOrd}`]], {
      origin: 'B1',
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
      `Doanhthu-tu-${start ? start : '--/--/----'}-den-${
        end ? end : '--/--/----'
      }.xlsx`
    )
  }

  return (
    <div className="analytic-chart-section">
      <FormDate
        from={start}
        to={end}
        onSubmit={handleSubmitTimeFilter}
        loading={loading}
      />
      <div>
        <button onClick={() => handleExport()}>Export report</button>
      </div>
      <div className="chart-container">
        <div className="chart-item">
          <IncomeCate cate={cate} totalPm={totalPm} />
        </div>

        <div className="chart-item ">
          <IncomePayment
            paymentType={paymentType}
            cate={cate}
            totalPayment={totalPayment}
          />
        </div>
        <div className="chart-item">
          <OrderSummary orderSummary={orderSummary} totalOrd={totalOrd} />
        </div>
      </div>
      {/* <div className="chart-info-detail">Details</div> */}
    </div>
  )
}

export default OverviewChart
