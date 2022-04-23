import React, { useState, useEffect } from 'react'
// import { GlobalState } from "../../GlobalState";
import ListCart from './components/ListCart'
import Bill from './components/Bill'
import Footers from '../../components/Footer'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import userApi from 'api/userApi'
import Breadcrumb from 'components/Breadcrumbs'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

function Cart() {
  //   const state = useContext(GlobalState);
  //   const [infor] = state.userApi.infor;

  const [onEdit, setOnEdit] = useState(false)
  const [orderOwner, setOrderOwner] = useState({
    name: '',
    phone: '',
    address: '',
  })
  const onChangeInput = (e) => {
    const { name, value } = e.target
    setOrderOwner({ ...orderOwner, [name]: value })
  }
  console.log(orderOwner)
  const user = useSelector((state) => state.user.current)
  const [info, setInfo] = useState({})

  const [cart, setCart] = useState([])
  useEffect(() => {
    if (user?.cart) {
      setCart(user.cart)
    }
  }, [user.cart])

  const [modalIsOpen, setIsOpen] = useState(false)

  useEffect(() => {
    ;(async function () {
      if (user) {
        const res = await userApi.getProfile()
        setInfo(res)
      }
    })()
  }, [user])

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
  const changeInfoShip = (e) => {
    e.preventDefault()
    setOnEdit(true)
    closeModal()
  }

  const [voucher, setVoucher] = useState()
  //ListBill
  const handleCheckVoucher = async (voucherCode) => {
    if (!voucherCode) return
    try {
      const res = await userApi.checkVoucher(voucherCode)
      setVoucher(res.voucher)
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }
  useEffect(() => {
    if (voucher) {
      console.log('aaaaaaaa')
      let newCart = JSON.parse(JSON.stringify(cart))
      cart.forEach((product) => {
        if (voucher.voucherProductId.length !== 0) {
          voucher.voucherProductId.forEach((v) => {
            if (product._id === v) {
              const priceAfter = (product.price * voucher.voucherDiscount) / 100
              newCart.forEach((item) => {
                if (item._id === product._id) {
                  // Object.preventExtensions(item)
                  item.priceDiscount = (item.price - priceAfter).toFixed(2)
                }
              })
              return
            }
          })
        }
        if (voucher.voucherProductCategory.length !== 0) {
          voucher.voucherProductCategory.forEach((v) => {
            if (product.category === v) {
              const priceAfter = (product.price * voucher.voucherDiscount) / 100

              newCart.forEach((item) => {
                if (item._id === product._id) {
                  // Object.preventExtensions(item)
                  item.priceDiscount = (item.price - priceAfter).toFixed(2)
                  console.log(product._id, 'item đay nè')
                  console.log(cart, 'cart check')
                }
              })
              return
            }
          })
        }
        if (voucher.voucherProductAuthor.length !== 0) {
          voucher.voucherProductAuthor.forEach((v) => {
            if (product.author === v) {
              const priceAfter = (product.price * voucher.voucherDiscount) / 100
              newCart.forEach((item) => {
                if (item._id === product._id) {
                  // Object.preventExtensions(item)
                  item.priceDiscount = (item.price - priceAfter).toFixed(2)
                }
              })
              return
            }
          })
        }
        if (voucher.voucherProductPublisher.length !== 0) {
          voucher.voucherProductPublisher.forEach((v) => {
            if (product.publisher === v) {
              const priceAfter = (product.price * voucher.voucherDiscount) / 100
              newCart.forEach((item) => {
                if (item._id === product._id) {
                  // Object.preventExtensions(item)
                  item.priceDiscount = (item.price - priceAfter).toFixed(2)
                  console.log(product._id, 'item đay nè')
                  console.log(cart, 'cart check')
                }
              })
              return
            }
          })
        }
      })
      setCart([...newCart])
    }
  }, [voucher])

  if (cart.length === 0)
    return (
      <div className='cart_empty'>
        <h2>
          You don't have any books in your shopping cart yet. Try back select
          it.
        </h2>
      </div>
    )

  return (
    <>
      <Breadcrumb />
      <div className='cart-shopping'>
        <h3 className='title-cart'>You have {cart.length} products shopping</h3>
        <div className='cart_container'>
          <div>
            <div className='info_checkout'>
              <div className='infcheckout_wrapper'>
                <p className='address_title'>Shipping Address</p>
                <p className='address_detail' onClick={openModal}>
                  Edit
                </p>
              </div>
              <div className='infcheckout_inner'>
                <div>
                  <div className='address_title_container'>
                    <span className='email_title'>Customer: {info.email}</span>
                    <span className='name_title'>
                      Receiver:{' '}
                      {onEdit && orderOwner.name ? orderOwner.name : info.name}
                    </span>
                    <span className='phone_title'>
                      Phone:{' '}
                      {onEdit && orderOwner.phone
                        ? orderOwner.phone
                        : info.phone}
                    </span>
                  </div>
                </div>
                <div className='address_info_item'>
                  <span>
                    Address:{' '}
                    {onEdit && orderOwner.address
                      ? orderOwner.address
                      : info.address}
                  </span>
                </div>
              </div>
            </div>
            <ListCart cart={cart} />
          </div>

          <div className='bill_container'>
            <Bill
              orderOwner={orderOwner}
              infor={info}
              cart={cart}
              onSubmit={handleCheckVoucher}
              voucher={voucher}
            />
          </div>
        </div>

        <Footers />
      </div>
      <div className='form-orderowner-modal'>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles3}
          //portalClassName="modal"
          contentLabel='Example Modal'
        >
          <button className='btnclose-modal' onClick={closeModal}>
            X
          </button>
          <div className='verify-infomation-ship'>
            <div className='verify-title'>
              <h2>Change Information</h2>
            </div>

            <form onSubmit={changeInfoShip}>
              <div className='form-verify'>
                <div className='form-left'>
                  <label htmlFor='orderowner'>Reveive Name</label>
                  <input
                    type='text'
                    name='name'
                    placeholder={orderOwner.name ? orderOwner.name : info.name}
                    value={orderOwner.name}
                    onChange={onChangeInput}
                  />
                  <label htmlFor='orderowner'>Reveive Phone</label>
                  <input
                    type='text'
                    name='phone'
                    placeholder={
                      orderOwner.phone ? orderOwner.phone : info.phone
                    }
                    value={orderOwner.phone}
                    onChange={onChangeInput}
                  />
                  <label htmlFor='orderowner'>Reveive Address</label>

                  <textarea
                    type='text'
                    name='address'
                    placeholder={
                      orderOwner.address ? orderOwner.address : info.address
                    }
                    value={orderOwner.address}
                    onChange={onChangeInput}
                    row='3'
                  />
                </div>
                <div className='form-right'>
                  <label htmlFor='orderowner'>Account Email</label>
                  <input
                    type='text'
                    placeholder={info.email}
                    value={info.email}
                    disabled
                  />
                  <label htmlFor='orderowner'>Account Name</label>
                  <input
                    type='text'
                    placeholder={info.name}
                    value={info.name}
                    disabled
                  />
                  <label htmlFor='orderowner'>Account Phone</label>
                  <input
                    type='text'
                    placeholder={info.phone}
                    value={info.phone}
                    disabled
                  />
                  <label htmlFor='orderowner'>Account Address</label>

                  <textarea
                    type='text'
                    placeholder={info.address}
                    value={info.address}
                    disabled
                    row='2'
                  />
                </div>
              </div>
              <div className='submit-change-infor'>
                <button type='submit'>Change information</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Cart
