import { RateReview, ShoppingCart } from '@mui/icons-material'
import {
  Avatar,
  Box,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Rating,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function HeaderCart(props) {
  const history = useHistory()
  const { isLogged, info, cart } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpenNotify = Boolean(anchorEl)

  const navigateCart = () => {
    handlePopoverClose()
    history.push('/cart')
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
      {info && isLogged && cart.length !== 0 ? (
        <span className="count">{cart.length}</span>
      ) : null}
      <ShoppingCart
        className="icon-users"
        aria-owns={isOpenNotify ? 'header-cart-popover' : undefined}
        aria-haspopup="true"
        onClick={handlePopoverOpen}
      />
      <Popover
        id="header-cart-popover"
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

            maxHeight: 650,
          }}
        >
          {cart.length > 0 &&
            cart.map((item) => (
              <Box
                key={item._id}
                onClick={() => navigateCart()}
                sx={{
                  '&:hover': { cursor: 'pointer', backgroundColor: '#fef' },
                }}
              >
                <ListItem>
                  {/* <ListItemAvatar>
                    <Avatar sx={{ color: '#ddd', backgroundColor: '#fff' }}>
                      <RateReview />
                    </Avatar>
                  </ListItemAvatar> */}
                  <ImageListItem
                    sx={{
                      pr: '5px',
                    }}
                  >
                    <img
                      src={item.images.url}
                      srcSet={item.images.url}
                      alt=""
                      loading="lazy"
                      style={{
                        display: 'block',
                        width: '40px',
                        height: 'auto',
                        ml: '-5px',
                        pr: '10px',
                      }}
                    />
                  </ImageListItem>
                  <ListItemText
                    primary={
                      <>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {item.title}

                          <Rating value={item.rating} size="small" readOnly />
                        </Box>
                      </>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.author}
                        </Typography>
                        {' - '}"{item.description}"
                      </>
                    }
                  />
                </ListItem>
              </Box>
            ))}
        </List>
      </Popover>
    </>
  )
}

export default HeaderCart
