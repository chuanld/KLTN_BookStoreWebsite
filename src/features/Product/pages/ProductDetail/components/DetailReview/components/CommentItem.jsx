import React, { useState, useEffect, useCallback } from 'react'
import { AccountCircle, SendAndArchive } from '@mui/icons-material'
import { Rating } from '@mui/material'
import moment from 'moment'
import ReplyCommentItem from './ReplyCommentItem'
import userApi from 'api/userApi'

const perPage = 3
let showComments = []
function CommentItem(props) {
  const { comment, info, onSubmit, key } = props
  // const [userComment, setUserComment] = useState('')
  const [onReply, setOnReply] = useState(false)
  const [isHide, setIsHide] = useState(true)

  //replyComment
  const [replyComment, setReplyComment] = useState([])
  const [hideReplyComment, setHideReplyComment] = useState([])
  const [next, setNext] = useState(3)
  const loopWithSlice = useCallback(
    (num) => {
      let start =
        comment.reply.length - (perPage + num) < 0
          ? 0
          : comment.reply.length - (perPage + num)
      showComments = comment.reply.slice(start, comment.reply.length)
      setHideReplyComment(start)
      setReplyComment(showComments)
    },
    [comment.reply]
  )

  useEffect(() => {
    loopWithSlice(0)
  }, [loopWithSlice])

  const handleReply = () => {
    setOnReply(!onReply)
  }
  const handleHideComment = () => {
    // setIsHide(!isHide)
    loopWithSlice(0)
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
  const handleLoadMoreComment = () => {
    loopWithSlice(next)
    setNext(next + perPage)
  }

  return (
    <>
      <div className="review-comment" key={key}>
        <div className="review-comment-user">
          <div className="user_name">
            <div className="user-avt">
              <AccountCircle />
            </div>
            <div>
              <div className="comment_username">{comment.username}</div>
              <div className="comment_date">
                Joined {moment(info.createdAt).fromNow()}
              </div>
            </div>
          </div>
          <div className="user_info">
            ???? vi???t
            <span>11 ????nh gi??</span>
          </div>
          <div className="user_info">
            ???? nh???n
            <span>3 l?????t c???m ??n</span>
          </div>
        </div>
        <div className="review-comment-container">
          <div className="rating-title">
            <div className="review-rating-level">
              <Rating value={comment.rating} size="small" readOnly />
            </div>
            <div className="comment">
              {comment.rating <= 1
                ? 'R???t t???'
                : comment.rating <= 2
                ? 'T???'
                : comment.rating <= 3
                ? 'T???m'
                : comment.rating <= 4
                ? 'T???t'
                : comment.rating <= 5
                ? 'Tuy???t v???i'
                : ''}
            </div>
          </div>
          <div className="atribute">
            <div className="review-comment__seller-name">
              <span className="review-comment__check-icon"></span>???? mua h??ng
            </div>
          </div>
          <div className="comment-content">{comment.content}</div>
          <div className="comment-created_at">
            <span>{moment(comment.createdAt).fromNow()}</span>
          </div>
          <span className="btn-like">Like</span>
          <span className="btn-reply" onClick={handleReply}>
            Reply
          </span>
          <span className="btn-reply" onClick={handleHideComment}>
            Hide all reply
          </span>
          {hideReplyComment > 0 && (
            <span className="btn-reply" onClick={handleLoadMoreComment}>
              Load more ({hideReplyComment}) comments
            </span>
          )}

          {/* ---Reply comment--- */}
          {onReply && (
            <div className="review-reply-comment">
              <ReplyCommentItem
                id={comment._id}
                name={comment.username}
                setOnReply={setOnReply}
                onSubmit={handleSubmitReply}
              />
            </div>
          )}
          {isHide && (
            <div className="review-sub_comment">
              {replyComment.map((comment) => (
                <div className="sub-comment" key={comment._id}>
                  <div className="sub-comment-avt">
                    <AccountCircle />
                  </div>
                  <div className="sub-comment-inner">
                    <div className="sub-comment-info">
                      <div className="sub-comment-info_name">
                        {comment.username}
                      </div>
                      <div className="sub-comment-info_date">
                        {moment(comment.createdAt).fromNow()}
                      </div>
                    </div>
                    <div
                      className="sub-comment-content"
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    >
                      {/* n??i chung ti???n n??o
                    c???a ????, gi?? ???? sao m?? nguy??n seal m???y b??c, ???o ahihi . ch???p
                    nh???n th?? mua th??i */}
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
