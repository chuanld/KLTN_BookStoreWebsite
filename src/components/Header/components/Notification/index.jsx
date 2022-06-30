import {
  More,
  NotificationImportantOutlined,
  RateReview,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Rating,
  Typography,
} from '@mui/material'
import logApi from 'api/logApi'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useState } from 'react'
import NotiPayment from './Components/NotiPayment'
import NotiRating from './Components/NotiRating'

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

function Notification(props) {
  const { socket, info, isAdmin } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpenNotify = Boolean(anchorEl)
  const [notifyLogs, setNotifyLogs] = useState([])
  const [notifyLogsUnRead, setNotifyLogsUnRead] = useState([])
  const [callback, setCallback] = useState(false)

  const getNotifyLogData = async () => {
    try {
      const res = await logApi.getNotiLog()
      setNotifyLogs(res.logs)
    } catch (err) {}
  }
  useEffect(() => {
    if (isAdmin) {
      getNotifyLogData()
    }
  }, [isAdmin, callback])

  useEffect(() => {
    if (socket && isAdmin) {
      socket.on('getNotification-admin', (data) => {
        setNotifyLogs([data, ...notifyLogs])
      })
    }
    // return () => socket.off('getNotification-admin')
  }, [socket, isAdmin, notifyLogs])

  useEffect(() => {
    if (notifyLogs.length > 0) {
      let arr = []
      notifyLogs.forEach((noti) => {
        if (!noti.isRead) {
          arr.unshift(noti)
        }
      })
      setNotifyLogsUnRead(arr)
    }
  }, [notifyLogs])

  //handle check noti
  const handleCheckedNotify = async (id, isRead) => {
    try {
      if (!id || isRead) return
      const res = await logApi.updateLogById(id)
      if (res.msg === 'sucess') setCallback(!callback)
    } catch (err) {}
  }

  //handle open/close popover
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <div>
        {info && isAdmin && notifyLogsUnRead.length !== 0 ? (
          <span className="count">{notifyLogsUnRead.length}</span>
        ) : null}
        <NotificationImportantOutlined
          className="icon-users"
          aria-owns={isOpenNotify ? 'header-notify-popover' : undefined}
          aria-haspopup="true"
          onClick={handlePopoverOpen}
        />
        <Popover
          id="header-notify-popover"
          open={isOpenNotify}
          onClose={handlePopoverClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 10,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}

          //   disableRestoreFocus
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 370,
              bgcolor: 'background.paper',
              overflow: 'auto',

              maxHeight: 500,
            }}
          >
            {notifyLogs.length > 0 &&
              notifyLogs.map((noti) => {
                if (noti.logType.includes('rating-book')) {
                  return <NotiRating noti={noti} />
                }
                if (noti.logType.includes('payment-book')) {
                  return <NotiPayment noti={noti} />
                }
                return undefined
              })}
          </List>
          {/* <Divider /> */}
          {/* <MenuItem>
            <ListItemIcon>
              <More fontSize="small" />
            </ListItemIcon>
            Xem thêm ...
          </MenuItem> */}
        </Popover>
      </div>
    </>
  )
}

export default Notification
