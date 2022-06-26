import React, { useEffect, useState } from 'react'
import { Rating } from '@mui/material'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom'
import commentApi from 'api/commentApi'
import userApi from 'api/userApi'
import Comments from './components/Comments'
import FilterTab from './components/FilterTab'
import dayjs from 'dayjs'

const initialState = {
  comment: '',
  rate: 0,
}

function DetailReview(props) {
  const { product, socket, user } = props
  const [values, setValues] = useState(initialState)
  const [info, setInfo] = useState({})
  const [callback, setCallback] = useState(false)
  const [characters, setCharacter] = useState(0)
  const { id } = useParams()

  const getDataUser = async () => {
    try {
      const res = await userApi.getProfile()
      setInfo(res)
    } catch (err) {}
  }

  useEffect(() => {
    if (user) {
      getDataUser()
    }
    return () => {
      setInfo({})
      setValues(initialState)
    }
    // eslint-disable-next-line
  }, [user, id, callback])

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(values, 'form submit comment')
    try {
      if (!values || values.rate > 5)
        return toast.warn('Something was wrong.Please try again')
      if (!values.comment || values.comment.trim().length < 10)
        return toast.warn('Comment must be at least 10 characters')
      const createdAt = new Date().toISOString()
      socket.emit('createComment', {
        username: info.name,
        content: values.comment,
        product_id: product._id,
        createdAt,
        rating: values.rate,
      })
      const res = await commentApi.updateRating(product._id, values.rate)
      const userSendNotify = {
        name: user.name,
        id: user._id,
      }
      const userSendProduct = {
        id: product._id,
        title: product.title,
      }

      socket.emit('sendNotificationRating', {
        senderType: 'rating-book',
        senderUser: userSendNotify,
        senderData: {
          rate: values.rate,
          content: values.comment,
        },
        senderTime: dayjs().toISOString(),
        senderObj: userSendProduct,
      })
      toast.success(res.msg)
      setValues(initialState)
      setCallback(!callback)
    } catch (err) {}
  }

  const rate = product.rating / product.countReviews || 0
  return (
    <div className="detail-comment">
      <div className="customer-review-heading">
        Đánh Giá - Nhận Xét Từ Khách Hàng
      </div>
      <div className="customer-review-container">
        <div className="customer-review-top">
          <div className="review-rating">
            <div className="review-rating-summary">
              <div className="review-rating-point">{rate.toFixed(2)}</div>
              <div className="review-rating-starts">
                <div className="count-starts">
                  <Rating precision={0.25} value={rate} readOnly />
                </div>
                <div className="review-rating-total">
                  {product.countReviews} nhận xét
                </div>
              </div>
            </div>
            <div className="review-rating-detail">
              <div className="review-rating-level">
                <Rating name="size-small" value={5} size="small" readOnly />

                <div className="count-comments">
                  <div className="counts" style={{ width: '80%' }}></div>
                </div>
                <div className="review-rating__number">57</div>
              </div>
              <div className="review-rating-level">
                <Rating name="size-small" value={4} size="small" readOnly />

                <div className="count-comments">
                  <div className="counts" style={{ width: '70%' }}></div>
                </div>
                <div className="review-rating__number">57</div>
              </div>
              <div className="review-rating-level">
                <Rating value={3} size="small" readOnly />

                <div className="count-comments">
                  <div className="counts" style={{ width: '60%' }}></div>
                </div>
                <div className="review-rating__number">57</div>
              </div>
              <div className="review-rating-level">
                <Rating value={2} size="small" readOnly />

                <div className="count-comments">
                  <div className="counts" style={{ width: '20%' }}></div>
                </div>
                <div className="review-rating__number">57</div>
              </div>
              <div className="review-rating-level">
                <Rating value={1} size="small" readOnly />

                <div className="count-comments">
                  <div className="counts" style={{ width: '5%' }}></div>
                </div>
                <div className="review-rating__number">57</div>
              </div>
            </div>
          </div>
          <div>
            <div className="comment-username-display">
              <div>
                <span>Commentator: {info.name}</span>
              </div>
              <div>
                <span>Đã mua hàng</span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="review-rating-display">
                <div>
                  <span>Rating: </span>
                </div>
                <div className="star-display">
                  <Rating
                    value={values.rate}
                    precision={0.5}
                    size="small"
                    onChange={(event, newValue) => {
                      setValues({ ...values, rate: newValue })
                    }}
                  />
                </div>
              </div>
              <div className="review-txt-comment">
                <div className="qna-ask-box-container">
                  <div className="qna-ask-box unfolded">
                    <span className="next-input next-input-multiple qna-ask-input">
                      <textarea
                        name="comment"
                        placeholder="Enter your question(s) here"
                        rows="5"
                        maxLength="300"
                        type="text"
                        height="100%"
                        value={values.comment}
                        data-spm-anchor-id="a2o4n.pdp_revamp.0.i2.22e92d9ezvLKzn"
                        onChange={onChangeInput}
                      ></textarea>
                      <span className="next-input-control">
                        <span className="next-input-len">
                          {values.comment.length}/300
                        </span>
                      </span>
                    </span>
                    <div className="qna-box-footer">
                      <div className="qna-ask-box-tips">
                        Your question should not contain contact information
                        such as email, phone or external web links. Visit " " if
                        you have questions about your previous order.
                      </div>
                      <button
                        type="submit"
                        className="next-btn next-btn-primary next-btn-medium qna-ask-btn"
                      >
                        ASK QUESTIONS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div></div>
        <Comments
          product_id={product._id}
          info={info}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  )
}

export default DetailReview
