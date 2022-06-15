import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AccountCircle, BorderColor, CalendarToday } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { logout } from 'features/Auth/userSlice'
import { dispatch } from 'app/store'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SideBar() {
  const user = useSelector((state) => state.user.current)
  const location = useLocation()

  const objParams = useMemo(() => {
    const arrParams = location.pathname.split('/')
    return { ...arrParams }
  }, [location.pathname])
  const logoutUser = async () => {
    const action = logout()
    const resultAction = await dispatch(action)
    const res = unwrapResult(resultAction)
    if (res.status === 0) {
      return toast.error(res.data.msg)
    }
    toast.success('See you again ^^')
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">{user.name}</h3>
          <ul className="sidebarList">
            <Link to="/account/infor">
              <li
                className={
                  objParams[2] === 'infor'
                    ? 'sidebarListItem active'
                    : 'sidebarListItem '
                }
              >
                <AccountCircle className="sidebarIcon" />
                Information
              </li>
            </Link>
            <Link to="/account/order">
              <li
                className={
                  objParams[2] === 'order'
                    ? 'sidebarListItem active'
                    : 'sidebarListItem '
                }
              >
                <BorderColor className="sidebarIcon" />
                Order History
              </li>
            </Link>
            <li className="sidebarListItem" onClick={() => logoutUser()}>
              <BorderColor className="sidebarIcon" /> Logout
            </li>
            {/* <li className='sidebarListItem'>
              <CalendarToday className='sidebarIcon' /> Logs
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar
