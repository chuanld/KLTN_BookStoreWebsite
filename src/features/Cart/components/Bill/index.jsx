import React, { useState, useEffect } from 'react'
import './styles.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PaypalExpressBtn from './PaypalButton'
// import PaypalButtonV2 from "./PaypalButtonV2";

import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'

import { deleteAllItem, paymentShipCOD } from 'features/Auth/userSlice'

import { unwrapResult } from '@reduxjs/toolkit'
import userApi from 'api/userApi'
// import HelicopterShip from "../../../utils/HelicopterShip/HelicopterShip";

Modal.setAppElement(document.getElementById('root'))
const customStyles3 = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    border: 'none',
    zIndex: '999',
  },
  content: {
    top: '375px',
    overflow: 'unset',
    border: 'none',
    background: 'transparent',
    height: 'auto',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export default function Bill({ orderOwner, infor, cart, voucher, onSubmit }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.current)
  console.log(cart, 'cart')
  const [total, setTotal] = useState(0)
  const [voucherCode, setVoucherCode] = useState('')

  const [orderInfo, setOrderInfo] = useState({})

  // const [itemid, setItemId] = useState(0);
  useEffect(() => {
    if (orderOwner) {
      setOrderInfo(orderOwner)
    }
  }, [orderOwner])

  useEffect(() => {
    //total
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return item.priceDiscount
          ? prev + item.priceDiscount * item.quantity
          : // : item.discount < 100
            // ? prev + ((item.price * (100 - item.discount)) / 100) * item.quantity
            prev + ((item.price * item.discount) / 100) * item.quantity
      }, 0)
      setTotal(total)
    }
    getTotal()
  }, [cart])

  const tranSuccess = async (payment) => {
    // console.log(payment);
    // const option = { type: "Paypal payment", paywith: "default" };
    // const { paymentID, address } = payment;
    // await axiosClient.post(
    //   "/api/order",
    //   {
    //     cart,
    //     orderID: paymentID,
    //     address: orderInfo.address ? orderInfo.address : address,
    //     name: orderInfo.name ? orderInfo.name : address.recipient_name,
    //     option,
    //   },
    //   {
    //     headers: { Authorization: token },
    //   }
    // );
    // cart.splice(0, cart.length);
    // setCart([...cart]);
    // updateCart(cart);
    // toast.success("You have successfully paid. Thanks you for trust us");
    // toast.info("Let check order in infomation");
    // setCallback(!callback);
  }

  const chkShipCOD = async (e) => {
    e.preventDefault()

    if (!infor.address && !orderInfo.address)
      return alert('Please update infomation address for ShipCOD')
    if (window.confirm(`Hi there. Do you confirm checkout`)) {
      document.body.classList.add('loading-data')
      const option = { type: 'ShipCOD payment', paywith: 'default' }
      var date = new Date()
      var foot =
        date.getDate() +
        '' +
        (date.getMonth() + 1) +
        date.getFullYear() +
        date.getHours() +
        date.getMinutes() +
        date.getMilliseconds()
      const ID = '' + foot
      const strID = ID.replace(/\s+/g, '')
      const orderID = `ShipCOD-${strID}`

      const data = {
        cart,
        orderID,
        address: orderInfo.address ? orderInfo.address : infor.address,
        name: orderInfo.name ? orderInfo.name : infor.name,
        option,
        voucherCode,
      }
      // await userApi.paymentShipCOD(data)
      const action = paymentShipCOD(data)
      const resultAction = await dispatch(action)
      const res = unwrapResult(resultAction)
      if (res.status === 1) {
        setTimeout(async () => {
          const action = deleteAllItem()
          const resultAction = await dispatch(action)
          const res = unwrapResult(resultAction)
          toast.success(res.msg)
          toast.info('Let check order in infomation')
          document.body.classList.remove('loading-data')
        }, 5000)
        closeModal()
        return
      }
      document.body.classList.remove('loading-data')
      toast.error(res.msg)
      return
    }
  }

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f000";
  }

  function closeModal() {
    setIsOpen(false)
  }
  const onChangeInput = (e) => {
    const { name, value } = e.target
    setOrderInfo({ ...orderInfo, [name]: value })
  }
  const handleCheckVoucher = async () => {
    if (!voucherCode) return
    if (!onSubmit) return
    // try {
    //   const res = await userApi.checkVoucher(voucherCode)
    //   setVoucher(res.voucher)
    // } catch (err) {}
    onSubmit(voucherCode)
  }

  // useEffect(() => {
  //   if (voucher) {
  //     cart.forEach((product) => {
  //       if (voucher.voucherProductId.length !== 0) {
  //         voucher.voucherProductId.forEach((v) => {
  //           if (product._id === v) {
  //             const priceAfter = (product.price * voucher.voucherDiscount) / 100
  //             product = { ...product, priceAfter }
  //             return
  //           }
  //         })
  //       }
  //       if (voucher.voucherProductCategory.length !== 0) {
  //         voucher.voucherProductCategory.forEach((v) => {
  //           if (product.category === v) {
  //             const priceAfter = (product.price * voucher.voucherDiscount) / 100
  //             // const newCart = [...cart]
  //             // newCart.forEach((nc) => {
  //             //   if (nc.category === v) {
  //             //     nc.price = priceAfter
  //             //   }
  //             // })
  //             // const newCart = [...cart]
  //             let newCart = JSON.parse(JSON.stringify(cart))
  //             newCart.forEach((item) => {
  //               if (item._id === product._id) {
  //                 // Object.preventExtensions(item)
  //                 item.priceDiscount = priceAfter
  //               }
  //             })
  //             setCart([...newCart])
  //             return
  //           }
  //         })
  //       }
  //       if (voucher.voucherProductAuthor.length !== 0) {
  //         voucher.voucherProductAuthor.forEach((v) => {
  //           if (product.author === v) {
  //             const priceAfter = (product.price * voucher.voucherDiscount) / 100
  //             product = { ...product, priceAfter }
  //             return
  //           }
  //         })
  //       }
  //       if (voucher.voucherProductPublisher.length !== 0) {
  //         voucher.voucherProductPublisher.forEach((v) => {
  //           if (product.publisher === v) {
  //             const priceAfter = (product.price * voucher.voucherDiscount) / 100
  //             product = { ...product, priceAfter }
  //             return
  //           }
  //         })
  //       }
  //     })
  //   }
  // }, [voucher])
  const handleVnpayment = async () => {
    try {
      console.log('click')
      const res = await userApi.paymentVnpay()
      console.log(res)
    } catch (err) {
      console.log(err.response)
    }
  }
  return (
    <>
      {/* {onHeli === true && <HelicopterShip />} */}
      <div className="total_cart">
        <h3 style={{ textAlign: 'center' }}>Your order</h3>
        <div className="row">
          <i>Customer: {infor.name}</i>
          <i>Address: {infor.address}</i>
        </div>

        <div style={{ textAlign: 'center' }}>
          -------------------------------
        </div>
        {cart.map((bill) => (
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
                ${bill.price.toFixed(2)}
              </p>
              {bill.priceDiscount ? (
                <p className="price-discount">${bill.priceDiscount}</p>
              ) : bill.discount < 100 ? (
                <p className="price-discount">
                  ${((bill.price * bill.discount) / 100).toFixed(2)}
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
        {voucher && (
          <>
            <h6>Voucher: {voucher.voucherDiscount}% </h6>
            <div style={{ textAlign: 'center' }}>
              ---------------------------------
            </div>
          </>
        )}

        <h3 className="total_bill">Total: ${parseFloat(total).toFixed(2)} </h3>
        <div style={{ textAlign: 'center' }}>
          ---------------------------------
        </div>
        <div className="discount-input">
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
        </div>
        <div className="btn_checkout">
          <h6>Phương thức thanh toán</h6>
          <div className="row">
            <div>
              <button className="shipcod" onClick={openModal}>
                ShipCOD
              </button>
            </div>
            ---⫗---
            <div className="payment">
              <PaypalExpressBtn total={total} tranSuccess={tranSuccess} />
              {/* <PaypalButtonV2
              className="paypal-checkout"
              total={total}
              tranSuccess={tranSuccess1}
            /> */}
            </div>
            {/* <div>
              <button className="shipcod" onClick={() => handleVnpayment()}>
                VN-Pay
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="form-orderowner-modal">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles3}
          //portalClassName="modal"
          contentLabel="Example Modal"
        >
          <button className="btnclose-modal" onClick={closeModal}>
            X
          </button>
          <div className="verify-infomation-ship">
            <div className="verify-title">
              <h2>Verify Information</h2>
            </div>

            <form onSubmit={chkShipCOD}>
              <div className="form-verify">
                <div className="form-left">
                  <label htmlFor="orderowner">Reveive Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={orderInfo.name ? orderInfo.name : infor.name}
                    value={orderInfo.name}
                    onChange={onChangeInput}
                  />
                  <label htmlFor="orderowner">Reveive Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder={
                      orderInfo.phone ? orderInfo.phone : infor.phone
                    }
                    value={orderInfo.phone}
                    onChange={onChangeInput}
                  />
                  <label htmlFor="orderowner">Reveive Address</label>

                  <textarea
                    type="text"
                    name="address"
                    placeholder={
                      orderInfo.address ? orderInfo.address : infor.address
                    }
                    value={orderInfo.address}
                    onChange={onChangeInput}
                    row="3"
                  />
                </div>
                <div className="form-right">
                  <label htmlFor="orderowner">Account Email</label>
                  <input
                    type="text"
                    placeholder={infor.email}
                    value={infor.email}
                    disabled
                  />
                  <label htmlFor="orderowner">Account Name</label>
                  <input
                    type="text"
                    placeholder={infor.name}
                    value={infor.name}
                    disabled
                  />
                  <label htmlFor="orderowner">Account Phone</label>
                  <input
                    type="text"
                    placeholder={infor.phone}
                    value={infor.phone}
                    disabled
                  />
                  <label htmlFor="orderowner">Account Address</label>

                  <textarea
                    type="text"
                    placeholder={infor.address}
                    value={infor.address}
                    rows="2"
                    disabled
                  />
                </div>
              </div>

              <div className="submit-change-infor">
                <button type="submit">Payment Proceed</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  )
}
