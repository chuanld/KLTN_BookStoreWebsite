import { useDispatch } from 'react-redux'
import { AddShoppingCart } from '@mui/icons-material'
import { Rating } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams, Link, useRouteMatch } from 'react-router-dom'
import Footers from '../../../../components/Footer'
import ProductItem from 'features/Product/components/ProductItem'
import productApi from 'api/productApi'
import { useSelector } from 'react-redux'
import userApi from 'api/userApi'
import { toast } from 'react-toastify'
import { StorageKeys } from '../../../../constant/storageKey'
import { addToCart } from 'features/Auth/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'

function DetailProduct() {
  const params = useParams()
  const path = useRouteMatch()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.current)

  const [detailProduct, setDetailProduct] = useState([])
  const [relateProduct, setRelateProduct] = useState([])
  const [cart, setCart] = useState([])

  const [onLoad, setOnLoad] = useState(false)
  const [quantityAmount, setQuantityAmount] = useState(1)

  useEffect(() => {
    ;(async function () {
      if (params) {
        //   products.forEach((product) => {
        //     if (product._id === params.id) {
        //       setDetailProduct(product);
        //     }
        //   });
        const res = await productApi.getProductById(params.id)
        setDetailProduct(res.product)
        const data = await productApi.getProducts({
          category: res.product.category,
          limit: 4,
        })
        setRelateProduct(data.products)
      }
    })()
  }, [params])

  const addCart = async (product, qtyAmount) => {
    if (user) {
      const check = user.cart.every((item) => {
        return item._id !== product._id
      })
      if (check) {
        setCart([...user.cart, { ...product, quantity: qtyAmount }])
        const action = addToCart([
          ...user.cart,
          { ...product, quantity: qtyAmount },
        ])
        // const result = await userApi.addToCart([
        //   ...user.cart,
        //   { ...product, quantity: qtyAmount },
        // ])
        // console.log(result)
        // localStorage.setItem(StorageKeys.USER, JSON.stringify(result.data))
        const resultAction = await dispatch(action)
        const res = unwrapResult(resultAction)
        console.log(res)
        if (res.status === 1) {
          toast.success(res.msg)
          return
        }
        toast.error(res.msg)
        return
      }
      toast.warn('This product has beed added to cart')
    }
  }
  const loadMore = () => {
    setOnLoad(!onLoad)
    console.log(onLoad)
  }
  const handleScrollTop = () => {
    window.scrollTo({
      top: 130,
      behavior: 'smooth',
    })
    setOnLoad(false)
  }
  if (detailProduct.length === 0) return null
  return (
    <>
      <div>
        <div className='detail'>
          <img src={detailProduct.images.url} alt='' />
          <div className='split-detail'></div>
          <div className='box-detail'>
            <div className='row'>
              <h2>{detailProduct.title}</h2>
              {/* <h4>{detailProduct.author}</h4>
                  <h4>{detailProduct.publisher}</h4> */}
              <h6>#{detailProduct.product_id}</h6>
            </div>
            <span>${detailProduct.price}</span>
            <p className='title_description_split'>
              Mô tả: <br />
              {detailProduct.description}
            </p>
            {/* <p>Nội dung: {detailProduct.content}</p> */}
            <p>Thể loại: {detailProduct.category}</p>
            <p>Tác giả: {detailProduct.author}</p>
            <p>NXB: {detailProduct.publisher}</p>
            <p>Sold: {detailProduct.sold}</p>
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
                  <input type='text' value={quantityAmount} />
                  <button onClick={() => setQuantityAmount(quantityAmount + 1)}>
                    {' '}
                    +{' '}
                  </button>
                </div>
              </div>
              <Link
                to='#'
                className='cart'
                onClick={() => addCart(detailProduct, quantityAmount)}
              >
                Add to cart <AddShoppingCart />
              </Link>
            </div>
          </div>
        </div>
        <div className='detail-info'>
          <div className='product_content'>
            <div className='container'>
              <h2 className='title_content'>Nội dung</h2>
              <div className={`box_content ${onLoad ? 'cYhiAl' : 'jpFMBi'}`}>
                <p className='title_content_split'>{detailProduct.content}</p>
                {onLoad ? null : <div className='gradient'></div>}
              </div>
              <button className='btn-more' onClick={loadMore}>
                {onLoad ? 'Rút gọn' : 'Xem thêm'}
              </button>
            </div>
          </div>
          <div className='product_rate'>
            <div className='product_rate_title'>
              <h2>Đánh giá sản phẩm</h2>
            </div>
            <div className='review-rating'>
              <div className='review-rating-summary'>
                <div className='review-rating-point'>4.7</div>
                <div className='review-rating-starts'>
                  <div className='count-starts'>
                    <Rating precision={0.5} />
                  </div>
                  <div className='review-rating-total'>10 nhận xét</div>
                </div>
              </div>
              <div className='review-rating-detail'>
                <div className='review-rating-level'>
                  <Rating
                    name='size-small'
                    defaultValue={5}
                    size='small'
                    readOnly
                  />

                  <div className='count-comments'></div>
                </div>
                <div className='review-rating-level'>
                  <Rating
                    name='size-small'
                    defaultValue={4}
                    size='small'
                    readOnly
                  />

                  <div className='count-comments'></div>
                </div>
                <div className='review-rating-level'>
                  <Rating defaultValue={3} size='small' readOnly />

                  <div className='count-comments'></div>
                </div>
                <div className='review-rating-level'>
                  <Rating defaultValue={2} size='small' readOnly />

                  <div className='count-comments'></div>
                </div>
                <div className='review-rating-level'>
                  <Rating defaultValue={1} size='small' readOnly />

                  <div className='count-comments'></div>
                </div>
              </div>
            </div>
            <div className='review-comments-user'>
              <div className='product_rate_title'>
                <h3>Nhận xét</h3>
              </div>
              <div className='comments-user'>
                <div className='comment-info'>
                  <div className='name'>Chuan</div>
                  <div className='rating'>
                    <Rating defaultValue={2} size='small' readOnly />
                  </div>
                </div>
                <div className='comment-content'>
                  <p>
                    Chưa đọc thử nhưng thấy shop đóng gói khá kĩ càng. Sách đẹp,
                    không méo mó. Sẽ ủng hộ tiếp!
                  </p>
                </div>
              </div>
              <div className='comments-user'>
                <div className='comment-info'>
                  <div className='name'>Chuan</div>
                  <div className='rating'>
                    <Rating defaultValue={2} size='small' readOnly />
                  </div>
                </div>
                <div className='comment-content'>
                  <p>
                    Chưa đọc thử nhưng thấy shop đóng gói khá kĩ càng. Sách đẹp,
                    không méo mó. Sẽ ủng hộ tiếp!
                  </p>
                </div>
              </div>
              <div className='comments-user'>
                <div className='comment-info'>
                  <div className='name'>Chuan</div>
                  <div className='rating'>
                    <Rating defaultValue={2} size='small' readOnly />
                  </div>
                </div>
                <div className='comment-content'>
                  <p>
                    Chưa đọc thử nhưng thấy shop đóng gói khá kĩ càng. Sách đẹp,
                    không méo mó. Sẽ ủng hộ tiếp!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='related_products'>
        <div className='container'>
          <div className='related_title'>
            <h2>Related products</h2>
          </div>

          <div className='products'>
            {relateProduct.map((product) => (
              <Link
                to={`/products/${product._id}`}
                onClick={() => handleScrollTop()}
              >
                <ProductItem key={product._id} product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footers />
    </>
  )
}

export default DetailProduct
