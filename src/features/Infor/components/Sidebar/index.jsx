import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AccountCircle, BorderColor, CalendarToday } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'

function SideBar() {
  const user = useSelector((state) => state.user.current)
  const location = useLocation()

  const objParams = useMemo(() => {
    const arrParams = location.pathname.split('/')
    return { ...arrParams }
  }, [location.pathname])

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>{user.name}</h3>
          <ul className='sidebarList'>
            <Link to='/account/infor'>
              <li
                className={
                  objParams[2] === 'infor'
                    ? 'sidebarListItem active'
                    : 'sidebarListItem '
                }
              >
                <AccountCircle className='sidebarIcon' />
                Information
              </li>
            </Link>
            <Link to='/account/order'>
              <li
                className={
                  objParams[2] === 'order'
                    ? 'sidebarListItem active'
                    : 'sidebarListItem '
                }
              >
                <BorderColor className='sidebarIcon' />
                Order History
              </li>
            </Link>
            <li className='sidebarListItem'>
              <BorderColor className='sidebarIcon' /> Logout
            </li>
            <li className='sidebarListItem'>
              <CalendarToday className='sidebarIcon' /> Logs
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar
