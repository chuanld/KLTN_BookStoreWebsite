import { SearchOutlined } from '@mui/icons-material'
import ListIcon from '@mui/icons-material/List'
import { unwrapResult } from '@reduxjs/toolkit'
import categoryApi from 'api/categoryApi'
import { logout } from 'features/Auth/userSlice'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LogoHeader } from 'template/assets/images/index'
import ModalAuth from '../../features/Auth/components/ModalAuth'
import { closeModal } from '../../features/Auth/userSlice'

import userApi from 'api/userApi'
import HeaderCart from './components/Cart'
import Notification from './components/Notification'
import HeaderProfile from './components/Profile'

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
function Header(props) {
  const { socket } = props
  const [categories, setCategories] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  const [searchInp, setSearchInp] = useState('')
  const [categoryInp, setCategoryInp] = useState('')

  const modalIsOpen = useSelector((state) => state.user.modalIsOpen)
  const info = useSelector((state) => state.user.current)
  const cart = useSelector((state) => state.user.cartCurrent) || []

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

  const logoutUser = async () => {
    const action = logout()
    const resultAction = await dispatch(action)
    const res = unwrapResult(resultAction)
    if (res.status === 0) {
      return toast.error(res.data.msg)
    }
    history.push('/')
    socket.disconnect()
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
                    {info && isAdmin && (
                      <div className="header_account-list mini_cart_wrapper top_links">
                        <Notification
                          socket={socket}
                          info={info}
                          isAdmin={isAdmin}
                        />
                      </div>
                    )}
                    <div className="header_account-list mini_cart_wrapper top_links">
                      <div className="header-mmini-cart">
                        <HeaderCart
                          isLogged={isLogged}
                          info={info}
                          cart={cart}
                        />
                      </div>
                    </div>
                    <div className="header_account-list header_wishlist top_links">
                      <div className="row">
                        {/* <AccountCircleOutlined className="icon-users" /> */}
                        {/* <i class='fas fa-user' style={{ fontSize: '25px' }} /> */}
                        {/* <div className="col">
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
                        </div> */}
                        <HeaderProfile
                          info={info}
                          isLogged={isLogged}
                          isAdmin={isAdmin}
                          logoutUser={logoutUser}
                        />
                        {/* {info && isLogged ? (
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
                        ) : null} */}
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
