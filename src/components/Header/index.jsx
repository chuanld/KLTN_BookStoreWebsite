import {
  AccountCircleOutlined,
  NotificationImportantOutlined,
  SearchOutlined,
  ShoppingCart,
} from '@mui/icons-material'
import ListIcon from '@mui/icons-material/List'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import ModalAuth from '../../features/Auth/components/ModalAuth'
import { closeModal, openModal } from '../../features/Auth/userSlice'
import { logout } from 'features/Auth/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { LogoHeader } from 'template/assets/images/index'
import categoryApi from 'api/categoryApi'

import userApi from 'api/userApi'
import { set } from 'react-hook-form'

Modal.setAppElement(document.getElementById('root'))
const customStyles1 = {
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
function Header() {
  const [categories, setCategories] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  const [searchInp, setSearchInp] = useState('')

  const [categoryInp, setCategoryInp] = useState('')

  const modalIsOpen = useSelector((state) => state.user.modalIsOpen)
  const info = useSelector((state) => state.user.current)
  // const [info, setInfo] = useState()
  // useEffect(() => {
  //   setInfo(JSON.parse(localStorage.getItem(StorageKeys.USER)))
  // }, [])

  const cart = useSelector((state) => state.user.cartCurrent) || []

  // const isLogged = info?.role === 0 || info?.role === 1 ? true : false || false
  // const isAdmin = info?.role === 1 ? true : false || false
  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (info) {
        const data = await userApi.getProfile()

        if (data.role === 0) {
          setIsLogged(true)
          setIsAdmin(false)
          return
        }
        setIsLogged(true)
        setIsAdmin(true)
      }
    })()
  }, [info])

  const onChangeInput = (input) => {
    setSearchInp(input)
  }
  const handleCategory = (e) => {
    setCategoryInp(e.target.value)
  }
  const submitSearch = (e) => {
    e.preventDefault()
    const querStrInput = searchInp ? `title[regex]=${searchInp}` : ''
    const querStrCate = categoryInp ? `category=${categoryInp}` : ''
    history.push(
      `/products${querStrInput && '?' + querStrCate + '&' + querStrInput}`
    )
    handeleScroll(587)
  }

  function afterOpenModal() {}

  const handeleScroll = (x, y) => {
    window.scroll({
      top: x || 187,
      left: y || 0,
      behavior: 'smooth',
    })
  }
  const handeleScrollHome = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  const accountAdmin = () => {
    return (
      <>
        <Link to="/account" className="auth_acc">
          <p>Admin</p>
          <p>Hi {info?.name}</p>
        </Link>
      </>
    )
  }
  const accountUser = () => {
    return (
      <>
        <Link to="/account" className="auth_acc">
          <p>Account</p>
          <p>Hi {info?.name}</p>
        </Link>
      </>
    )
  }

  const logoutUser = async () => {
    const action = logout()
    const resultAction = await dispatch(action)
    const res = unwrapResult(resultAction)
    if (res.status === 0) {
      return toast.error(res.data.msg)
    }
    toast.success('See you again ^^')
  }

  //reloadCategory
  useEffect(() => {
    const getCate = async () => {
      try {
        const res = await categoryApi.getCategories()
        setCategories(res)
      } catch (err) {}
    }
    getCate()
  }, [])

  return (
    <>
      <div className="main_header">
        {/* <div class="header_top">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-7 col-md-7">
                <div class="welcome-text">
                  <p>Free Delivery: </p>
                </div>
              </div>
              <div class="col-lg-5 col-md-5">
                <div class="language_currency text-right">
                  <ul>
                    <li class="language">
                      English <i class="fa fa-angle-down"></i>
                      <ul class="dropdown_language">
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="header_middle">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-4">
                <div className="logo">
                  <Link to="/">
                    <img src={LogoHeader} alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-6 col-6">
                <div className="header_right_info">
                  <div className="search_container">
                    <form className="formsr" onSubmit={submitSearch}>
                      <div className="hover_category">
                        <select
                          className="select_option"
                          name="category"
                          onChange={handleCategory}
                        >
                          <option value="">All Categories</option>
                          {categories.map((category) => (
                            <option value={category.name} key={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="search_box">
                        <input
                          placeholder="Search product..."
                          type="text"
                          // value={searchInp}
                          className="inp_search"
                          onChange={(e) => onChangeInput(e.target.value)}
                        />
                        <button type="submit">
                          <SearchOutlined />
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="header_account_area">
                    <div className="header_account-list top_links">
                      {/* {info && isLogged && cart.length !== 0 ? (
                        <span className='count'>{cart.length}</span>
                      ) : null}
                      <NotificationImportantOutlined className='icon-users' />
                      {info && isLogged && cart.length !== 0 ? (
                        <ul className='dropdown_links'>
                          {cart.map((item) => (
                            <li key={item._id}>
                              <Link to='#'>{item.product_id} </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null} */}
                    </div>
                    <div className="header_account-list mini_cart_wrapper top_links">
                      {info && isLogged && cart.length !== 0 ? (
                        <span className="count">{cart.length}</span>
                      ) : null}
                      <ShoppingCart className="icon-users" />
                      {info && isLogged && cart.length !== 0 ? (
                        <ul className="dropdown_links dropdown-custome-cart">
                          {cart.map((item) => (
                            <li key={item._id}>
                              <Link to="/cart">{item.title} </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div className="header_account-list header_wishlist top_links">
                      <div className="row">
                        <AccountCircleOutlined className="icon-users" />
                        {/* <i class='fas fa-user' style={{ fontSize: '25px' }} /> */}
                        <div className="col">
                          {info && isAdmin ? (
                            accountAdmin()
                          ) : info && isLogged ? (
                            accountUser()
                          ) : (
                            <Link
                              to="#"
                              className="auth_acc"
                              onClick={() => dispatch(openModal())}
                            >
                              <p>Login/Register</p>
                              <p>Account</p>
                            </Link>
                          )}
                        </div>
                        {info && isLogged ? (
                          <ul className="dropdown_links">
                            <li>
                              <Link to="/account/infor">Information</Link>
                            </li>
                            <li>
                              <Link to="/cart">Cart shopping</Link>
                            </li>
                            <li>
                              <Link to="/" onClick={logoutUser}>
                                Logout account
                              </Link>
                            </li>
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header_bottom">
        <div className="container sticky-header">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="categories_menu ">
                <div className="categories_title top_links1">
                  <ListIcon className="menu_cart_icon" />
                  <h2 className="categori_toggle">Categories</h2>

                  <ul className="dropdown_links1">
                    {categories.map((category) => (
                      <li key={category._id}>
                        <Link to={`/products?${'category=' + category.name}`}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mega_menu top_links"></div>
                </div>
                <div className="categories_menu_toggle"></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="main_menu menu_position">
                <nav>
                  <ul>
                    <li>
                      <NavLink
                        to="/"
                        className="nav-link"
                        exact
                        activeClassName="active"
                        onClick={handeleScrollHome}
                      >
                        home
                      </NavLink>
                    </li>
                    <li className="mega_items">
                      <NavLink
                        to="/products"
                        className="nav-link"
                        activeClassName="active"
                        onClick={() => handeleScroll()}
                      >
                        shop
                      </NavLink>
                    </li>
                    {info && isLogged ? (
                      <li>
                        <NavLink
                          to="/cart"
                          className="nav-link"
                          activeClassName="active"
                          onClick={() => handeleScroll()}
                        >
                          Cart
                        </NavLink>
                      </li>
                    ) : null}
                    {info && isLogged && isAdmin ? (
                      <li>
                        <NavLink
                          to="/admin"
                          className="nav-link"
                          activeClassName="active"
                          href="#admin-page"
                          onClick={() => handeleScroll()}
                        >
                          Admin Panel
                        </NavLink>
                      </li>
                    ) : null}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="call-support">
                <p>Call Support: 0123456789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-login-modal">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={() => dispatch(closeModal())}
          style={customStyles1}
          //portalClassName="modal"
          contentLabel="Example Modal"
        >
          <ModalAuth />
        </Modal>
      </div>
    </>
  )
}

export default Header
