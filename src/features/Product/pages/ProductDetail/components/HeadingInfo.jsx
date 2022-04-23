import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AddShoppingCart } from '@mui/icons-material'
import { Rating } from '@mui/material'

function HeadingInfo(props) {
  const { product, onSubmit } = props
  const [quantityAmount, setQuantityAmount] = useState(1)
  const rate = product.rating / product.countReviews || 0
  const priceAfterDiscount = ((product.price * product.discount) / 100).toFixed(
    2
  )

  return (
    <div className='detail'>
      <img src={product.images.url} alt='' />
      <div className='split-detail'></div>
      <div className='box-detail'>
        <div className='row'>
          <div className='row'>
            <h2>{product.title}</h2>
            <p style={{ color: '#087b39' }}>
              <i>(Discount {100 - product.discount}%)</i>
            </p>
          </div>

          <h6>#{product.product_id}</h6>
        </div>
        <div className='box-detail-wrapper'>
          {product.discount !== 100 ? (
            <span>${priceAfterDiscount}</span>
          ) : (
            <span>${product.price}</span>
          )}
          {product.discount !== 100 && (
            <div className='row origin-price'>
              <span style={{ textDecoration: 'line-through', color: '#ddd' }}>
                ${product.price}
              </span>
              <p style={{ color: '#ddd' }}>
                <i>(Giá gốc)</i>
              </p>
            </div>
          )}
          <div className='row box-detail-wrapper_rating'>
            <div className='rating'>
              <Rating precision={0.25} size='small' value={rate} />
            </div>
            <p className=''>({product.countReviews}) lượt đánh giá</p>
          </div>
        </div>

        <p className='title_description_split'>
          Mô tả: <br />
          {product.description}
        </p>

        <p>Thể loại: {product.category}</p>
        <p>Tác giả: {product.author}</p>
        <p>NXB: {product.publisher}</p>
        <p>Sold: {product.sold}</p>
        {/* <div className="amount">
              <button onClick={() => decrement(detailProduct._id)}> - </button>
              <span>1 {detailProduct.quantity} </span>
              <button onClick={() => increment(detailProduct._id)}> + </button>
            </div> */}
        <div className='quantity-box'>
          <div className='quantity-col1'>
            <div className='quantity-amount'>
              <button
                onClick={
                  quantityAmount !== 1
                    ? () => setQuantityAmount(quantityAmount - 1)
                    : null
                }
              >
                {' '}
                -{' '}
              </button>
              <input type='text' value={quantityAmount} readOnly />
              <button onClick={() => setQuantityAmount(quantityAmount + 1)}>
                {' '}
                +{' '}
              </button>
            </div>
          </div>
          <Link
            to='#'
            className='cart'
            onClick={() => onSubmit(product._id, quantityAmount)}
          >
            Add to cart <AddShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeadingInfo
