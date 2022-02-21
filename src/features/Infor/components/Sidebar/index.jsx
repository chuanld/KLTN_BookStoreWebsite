import React from 'react'
import { useSelector } from 'react-redux'
import { AccountCircle, BorderColor, CalendarToday } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function SideBar() {
  const user = useSelector((state) => state.user.current)

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>{user.name}</h3>
          <ul className='sidebarList'>
            <Link to='/infor'>
              <li className='sidebarListItem'>
                <AccountCircle className='sidebarIcon' />
                Information
              </li>
            </Link>
            <Link to='/order'>
              <li className='sidebarListItem'>
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
