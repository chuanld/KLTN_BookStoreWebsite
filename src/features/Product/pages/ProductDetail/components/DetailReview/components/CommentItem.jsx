import React, { useState, useEffect } from 'react'
import { AccountCircle, SendAndArchive } from '@mui/icons-material'
import { Rating } from '@mui/material'
import moment from 'moment'
import ReplyCommentItem from './ReplyCommentItem'
import userApi from 'api/userApi'

function CommentItem(props) {
  const { comment, info, onSubmit } = props
  const [userComment, setUserComment] = useState('')
  const [onReply, setOnReply] = useState(false)
  const [isHide, setIsHide] = useState(true)
  const handleReply = () => {
    setOnReply(!onReply)
  }
  const handleHideComment = () => {
    setIsHide(!isHide)
  }
  const getUserComment = async () => {
    try {
      //getInfo of comment
    } catch (err) {}
  }
  useEffect(() => {
    if (comment) {
      getUserComment()
    }
  }, [comment])

  const handleSubmitReply = (content) => {
    if (!onSubmit) return
    const createdAt = new Date().toISOString()
    const values = {
      idComment: comment._id,
      username: info.name,
      content: content,
      product_id: comment.product_id,
      createdAt,
      send: 'replyComment',
    }
    onSubmit(values)
    setOnReply(false)
  }

  return (
    <>
      <div className='review-comment' key={comment._id}>
        <div className='review-comment-user'>
          <div className='user_name'>
            <div className='user-avt'>
              <AccountCircle />
            </div>
            <div>
              <div className='comment_username'>{comment.username}</div>
              <div className='comment_date'>
                Joined {moment(info.createdAt).fromNow()}
              </div>
            </div>
          </div>
          <div className='user_info'>
            Đã viết
            <span>11 đánh giá</span>
          </div>
          <div className='user_info'>
            Đã nhận
            <span>3 lượt cảm ơn</span>
          </div>
        </div>
        <div className='review-comment-container'>
          <div className='rating-title'>
            <div className='review-rating-level'>
              <Rating value={comment.rating} size='small' readOnly />
            </div>
            <div className='comment'>
              {comment.rating <= 1
                ? 'Rất tệ'
                : comment.rating <= 2
                ? 'Tệ'
                : comment.rating <= 3
                ? 'Tạm'
                : comment.rating <= 4
                ? 'Tốt'
                : comment.rating <= 5
                ? 'Tuyệt vời'
                : ''}
            </div>
          </div>
          <div className='atribute'>
            <div className='review-comment__seller-name'>
              <span className='review-comment__check-icon'></span>Đã mua hàng
            </div>
          </div>
          <div className='comment-content'>{comment.content}</div>
          <div className='comment-created_at'>
            <span>{moment(comment.createdAt).fromNow()}</span>
          </div>
          <span className='btn-like'>Like</span>
          <span className='btn-reply' onClick={handleReply}>
            Reply
          </span>
          <span className='btn-reply' onClick={handleHideComment}>
            Hide all reply
          </span>

          {/* ---Reply comment--- */}
          {onReply && (
            <div className='review-reply-comment'>
              <ReplyCommentItem
                id={comment._id}
                name={comment.username}
                setOnReply={setOnReply}
                onSubmit={handleSubmitReply}
              />
            </div>
          )}
          {isHide && (
            <div className='review-sub_comment'>
              {comment.reply.map((comment) => (
                <div className='sub-comment'>
                  <div className='sub-comment-avt'>
                    <AccountCircle />
                  </div>
                  <div className='sub-comment-inner'>
                    <div className='sub-comment-info'>
                      <div className='sub-comment-info_name'>
                        {comment.username}
                      </div>
                      <div className='sub-comment-info_date'>
                        {moment(comment.createdAt).fromNow()}
                      </div>
                    </div>
                    <div
                      className='sub-comment-content'
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    >
                      {/* nói chung tiền nào
                    của đó, giá đó sao mà nguyên seal mấy bác, ảo ahihi . chấp
                    nhận thì mua thôi */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CommentItem
