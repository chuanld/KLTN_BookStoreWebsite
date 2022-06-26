import {
  AccountBalance,
  AccountCircle,
  AccountCircleOutlined,
  Logout,
  RateReview,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material'
import { dispatch } from 'app/store'
import { openModal } from 'features/Auth/userSlice'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function HeaderProfile(props) {
  const history = useHistory()
  const { isLogged, info, logoutUser } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpenNotify = Boolean(anchorEl)

  const navigateTo = (path) => {
    if (!path) return
    handlePopoverClose()
    history.push(path)
  }
  const navigateLogout = () => {
    handlePopoverClose()
    logoutUser()
  }
  //handle open/close popover
  const handlePopoverOpen = (event) => {
    if (!isLogged || !info) return dispatch(openModal())
    info && isLogged && setAnchorEl(event.currentTarget)
  }
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const accountAdmin = () => {
    return (
      <>
        {/* <Link to="/account" className="auth_acc">
          <p>Admin</p>
          <p>Hi {info?.name}</p>
        </Link> */}
      </>
    )
  }
  const accountUser = () => {
    return (
      <>
        {/* <Link to="/account" className="auth_acc">
          <p>Account</p>
          <p>Hi {info?.name}</p>
        </Link> */}
      </>
    )
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
        onClick={(e) => handlePopoverOpen(e)}
      >
        <AccountCircleOutlined
          className="icon-users"
          aria-owns={
            isOpenNotify && info && isLogged
              ? 'header-profile-popover'
              : undefined
          }
          aria-haspopup="true"
          sx={{ mr: '10px' }}
        />
        {info && isLogged ? (
          <ListItemText
            primary={
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Welcome
                  </Typography>
                </Box>
              </>
            }
            secondary={
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {info.name}
                  </Typography>
                </Box>
              </>
            }
          />
        ) : (
          <ListItemText
            primary={
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Account
                  </Typography>
                </Box>
              </>
            }
            secondary={
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    Login / Register
                  </Typography>
                </Box>
              </>
            }
          />
        )}
      </Box>

      <Popover
        id="header-profile-popover"
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
            maxWidth: 360,
            bgcolor: 'background.paper',
            overflow: 'auto',

            maxHeight: 5000,
          }}
        >
          {info && isLogged ? (
            <Box
              // onClick={() => navigateCart()}
              sx={{
                '&:hover': { cursor: 'pointer', backgroundColor: '#fef' },
              }}
              onClick={() => navigateTo('/account/infor')}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ color: '#ddd', backgroundColor: '#fff' }}>
                    <AccountCircle />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Hi {info?.name}
                        </Typography>
                      </Box>
                    </>
                  }
                  secondary={
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {info?.role === 1 ? 'Admin' : 'Account'}
                        </Typography>
                      </Box>
                    </>
                  }
                />
              </ListItem>
            </Box>
          ) : null}
          <Box
            // onClick={() => navigateCart()}
            sx={{
              '&:hover': { cursor: 'pointer', backgroundColor: '#fef' },
            }}
            onClick={() => navigateLogout()}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ color: '#ddd', backgroundColor: '#fff' }}>
                  <Logout />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Logout Account
                      </Typography>
                    </Box>
                  </>
                }
              />
            </ListItem>
          </Box>
        </List>
      </Popover>
    </>
  )
}

export default HeaderProfile
