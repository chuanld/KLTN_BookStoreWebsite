import { RateReview } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

function NotiRating({ noti, handleCheckedNotify }) {
  return (
    <>
      <Box
        key={noti._id}
        onClick={() => handleCheckedNotify(noti._id, noti.isRead)}
        sx={{ '&:hover': { cursor: 'pointer' } }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar
              sx={
                noti?.isRead
                  ? { color: '#ddd', backgroundColor: '#fff' }
                  : { color: 'green', backgroundColor: '#ddd' }
              }
            >
              <RateReview />
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
                  {noti.logObject?.title}

                  <Rating
                    value={noti.logAction?.rate}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </Box>
              </>
            }
            secondary={
              <>
                <Box sx={{ width: '100%' }}>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {noti.logBy?.name} {' - '}
                    <Typography
                      sx={{
                        display: 'inline',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxHeight: '70px',
                      }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      "{noti.logAction?.content}"
                    </Typography>
                  </Typography>
                  <Typography
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxHeight: '70px',
                    }}
                    component="i"
                    variant="body2"
                    color="text.secondary"
                  >
                    {dayjs(noti.createdAt).fromNow()}

                    {noti.isRead && (
                      <Typography
                        sx={{
                          display: 'inline',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxHeight: '70px',
                        }}
                        component="i"
                        variant="body2"
                        color="text.secondary"
                      >
                        {' - '}Seen {dayjs(noti.readedAt).fromNow()}✔
                      </Typography>
                    )}
                  </Typography>
                </Box>
              </>
            }
          />
        </ListItem>
        <Divider />
      </Box>
    </>
  )
}

export default NotiRating
