import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'
import userApi from 'api/userApi'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Breadcrumb from 'components/Breadcrumbs'
import { formatCurrency } from 'utils/Format'

Modal.setAppElement(document.getElementById('root'))
const customStyles3 = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    border: 'none',
    zIndex: '999',
    transition: 'all 0.3s ease-in',
  },
  content: {
    top: '475px',
    overflow: 'unset',
    border: 'none',
    background: 'transparent',
    height: 'auto',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.3s ease-in',
  },
}
export default function OrderDetail() {
  const params = useParams()
  const history = useHistory()

  const [orderInfoDetail, setOrderInfoDetail] = useState()
  const [total, setTotal] = useState(0)
  const [isOpenBill, setIsOpenBill] = useState(false)

  const getTotal = () => {
    const total = orderInfoDetail.cart.reduce((prev, item) => {
      return item.priceDiscount
        ? prev + item.priceDiscount * item.quantity
        : // : item.discount < 100
          // ? prev + ((item.price * (100 - item.discount)) / 100) * item.quantity
          prev + ((item.price * item.discount) / 100) * item.quantity
    }, 0)
    setTotal(total)
  }
  console.log(orderInfoDetail, 'orderInfoDetail')
  useEffect(() => {
    if (orderInfoDetail) {
      getTotal()
    }
  }, [params.id, orderInfoDetail])

  useEffect(() => {
    ;(async function () {
      if (params.id) {
        // orderInfo.forEach((item) => {
        //   if (item._id === params.id) setOrderInfoDetail(item);
        // });
        const res = await userApi.getOrderInfoDetailById(params.id)
        setOrderInfoDetail(res.orderInfo)
        console.log(res)
      }
    })()
  }, [params.id])
  console.log(orderInfoDetail)

  const handleCancelOrder = async (id) => {
    try {
      if (orderInfoDetail.status !== 0) {
        return toast.success(
          'The order has been approved by the administrator.'
        )
      }
      document.body.classList.add('loading-data')
      if (
        window.confirm(
          'Are you sure cancel this order?. This action cannot be undone!'
        )
      ) {
        const data = {
          id,
          status: 1,
        }
        const res = await userApi.cancelOrder(data)
        history.push('/account/order')
        toast.success(res.msg)
      }
    } catch (err) {
      toast.error(err.response.data.msg)
    }
    document.body.classList.remove('loading-data')
  }

  const outputPdf = () => {
    exportPDF()
  }
  const exportPDF = () => {
    const input = document.getElementById('modal-pdf-report-bill')
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('img/png')
      const pdf = new jsPDF('p', 'mm', [135, 175])
      pdf.addImage(imgData, 'PNG', 1, 1)
      pdf.save('File.pdf')
    })
  }

  function openModal() {
    setIsOpenBill(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f000";
  }

  function closeModal() {
    setIsOpenBill(false)
  }
  if (!orderInfoDetail) return null
  return (
    <>
      {/* <div className="session-heading">
        <Breadcrumb />
      </div> */}
      <div className="order-detail">
        <div className="orderListTitle">
          <h4>
            Order {orderInfoDetail.orderID} has {orderInfoDetail?.cart?.length}
            ordered
          </h4>
          <div>
            <button
              className="orderInvoiceButton"
              onClick={() => setIsOpenBill(true)}
            >
              Invoice
            </button>
            {orderInfoDetail.status === 0 ? (
              <button
                className="orderCancelButton"
                onClick={() => handleCancelOrder(orderInfoDetail._id)}
              >
                Cancel order
              </button>
            ) : null}
          </div>
        </div>

        <div className="ordersList">
          <table className="orderListOrder">
            <thead>
              <tr>
                <th>ProductID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Kim Đồng</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {orderInfoDetail.cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.product_id}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.publisher}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <img src={item.images.url} alt="" height="140px" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="invoice-modal">
        <Modal
          isOpen={isOpenBill}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles3}
          //portalClassName="modal"
          contentLabel="Example Modal"
        >
          <button className="btnclose-modal" onClick={closeModal}>
            X
          </button>
          <div className="total_cart" id="modal-pdf-report-bill">
            <h3 style={{ textAlign: 'center' }}>Your order</h3>
            <div className="row">
              <i>Customer: {orderInfoDetail.name}</i>
              <i>Address: {Object.values(orderInfoDetail.address)}</i>
            </div>

            <div style={{ textAlign: 'center' }}>
              -------------------------------
            </div>
            {orderInfoDetail?.cart.map((bill) => (
              <div className="row" key={bill._id}>
                <h6 className="subtotal">
                  Subtotal:{' '}
                  <p
                    style={
                      bill.priceDiscount
                        ? {
                            textDecoration: 'line-through',
                            color: '#ddd',
                            fontStyle: 'italic',
                          }
                        : bill.discount < 100
                        ? {
                            textDecoration: 'line-through',
                            color: '#ddd',
                            fontStyle: 'italic',
                          }
                        : {}
                    }
                  >
                    {formatCurrency(bill.price)}
                  </p>
                  {bill.priceDiscount ? (
                    <p className="price-discount">
                      {formatCurrency(bill.priceDiscount)}
                    </p>
                  ) : bill.discount < 100 ? (
                    <p className="price-discount">
                      {formatCurrency((bill.price * bill.discount) / 100)}
                    </p>
                  ) : null}
                  x {bill.quantity}
                </h6>
                <h6>{bill.product_id}</h6>
              </div>
            ))}

            <div style={{ textAlign: 'center' }}>
              ---------------------------------
            </div>
            {orderInfoDetail?.voucher !== 'not applied' && (
              <>
                <h6>Voucher: {orderInfoDetail.voucher.voucherDiscount}% </h6>
                <div style={{ textAlign: 'center' }}>
                  ---------------------------------
                </div>
              </>
            )}
            <div className="row row-export-bill">
              <h3 className="total_bill">Total: {formatCurrency(total)} </h3>
              <div className="btn-export-pdf">
                <button onClick={() => outputPdf()}>Export PDF</button>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              ---------------------------------
            </div>
            {/* <div className="discount-input">
          <div className="input-wrapper">
            <div className="input-disc">
              <input
                type="text"
                value={voucherCode}
                placeholder="Enter your voucher here"
                onChange={(e) => setVoucherCode(e.target.value)}
              />
            </div>
            <div className="button-check checked">
              <button onClick={() => handleCheckVoucher()}>Check</button>
            </div>
          </div>
        </div> */}
            <div className="btn_checkout">
              <h6>
                Status:{' '}
                {orderInfoDetail.status === 6
                  ? 'Đã nhận đơn hàng'
                  : orderInfoDetail.status === 5
                  ? 'Đã thanh toán đơn hàng'
                  : orderInfoDetail.status === 4
                  ? 'Đang giao đơn hàng'
                  : orderInfoDetail.status === 3
                  ? 'Tạm hoãn đơn hàng'
                  : orderInfoDetail.status === 2
                  ? 'Đã xác nhận đơn hàng'
                  : orderInfoDetail.status === 1
                  ? 'Đã hủy đơn hàng'
                  : 'Chờ xác nhận đơn hàng'}
              </h6>
              <br />
              <h6>
                Phương thức thanh toán:{' '}
                {orderInfoDetail.option.type.includes('VnPay')
                  ? 'VNPay payment'
                  : orderInfoDetail.option.type.includes('PAYID')
                  ? 'Paypal payment'
                  : 'ShipCOD payment'}
              </h6>
              <br />
              {orderInfoDetail.option.type.includes('VnPay') && (
                <h6>
                  Bank: {orderInfoDetail.option.bankCode},{' '}
                  {orderInfoDetail.option.paywith}
                </h6>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
