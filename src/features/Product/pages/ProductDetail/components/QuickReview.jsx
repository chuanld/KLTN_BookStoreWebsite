import React, { useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from 'features/Auth/userSlice'
import { toast } from 'react-toastify'
import commentApi from 'api/commentApi'
import { useParams } from 'react-router-dom'

function QuickReview(props) {
  const { id } = useParams()
  const { product, onSubmit } = props
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.current)
  const [isShowMore, setIsShowMore] = useState(false)
  const rate = product.rating / product.countReviews || 0

  const showCommentsAndRating = () => {
    if (!onSubmit) return
    if (!user) {
      dispatch(openModal())
      return toast.warn('Please login to rating book')
    }
    setIsShowMore(!isShowMore)
    onSubmit(!onSubmit)
  }

  const [comments, setComments] = useState([])

  const getComments = async () => {
    try {
      const res = await commentApi.getComments(product._id, {
        limit: 2,
        sort: '-rating',
      })
      console.log(res.result)
      setComments(res.comments)
    } catch (err) {}
  }
  useEffect(() => {
    getComments()
    return () => {
      setComments([])
    }
    // eslint-disable-next-line
  }, [user, id, product._id])
  return (
    <div className='product_rate'>
      <div className='product_rate_title'>
        <h2>Đánh giá sản phẩm</h2>
      </div>
      <div className='review-rating'>
        <div className='review-rating-summary'>
          <div className='review-rating-point'>{rate.toFixed(2)}</div>
          <div className='review-rating-starts'>
            <div className='count-starts'>
              <Rating precision={0.25} value={rate} readOnly />
            </div>
            <div className='review-rating-total'>
              {product.countReviews} nhận xét
            </div>
          </div>
        </div>
        <div className='review-rating-detail'>
          <div className='review-rating-level'>
            <Rating name='size-small' value={5} size='small' readOnly />

            <div className='count-comments'></div>
          </div>
          <div className='review-rating-level'>
            <Rating name='size-small' value={4} size='small' readOnly />

            <div className='count-comments'></div>
          </div>
          <div className='review-rating-level'>
            <Rating value={3} size='small' readOnly />

            <div className='count-comments'></div>
          </div>
          <div className='review-rating-level'>
            <Rating value={2} size='small' readOnly />

            <div className='count-comments'></div>
          </div>
          <div className='review-rating-level'>
            <Rating value={1} size='small' readOnly />

            <div className='count-comments'></div>
          </div>
        </div>
      </div>
      <div className='review-comments-user'>
        <div className='product_rate_title'>
          <h3>Nhận xét</h3>
        </div>
        {comments.length !== 0 &&
          comments.map((comment) => (
            <div className='comments-user' key={comment._id}>
              <div className='comment-info'>
                <div className='name'>{comment.username}</div>
                <div className='rating'>
                  <Rating value={comment.rating} size='small' readOnly />
                </div>
              </div>
              <div className='comment-content'>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
      </div>
      <button className='btn-more' onClick={showCommentsAndRating}>
        {isShowMore ? 'Hidden' : 'Show more'}
      </button>
    </div>
  )
}

export default QuickReview
