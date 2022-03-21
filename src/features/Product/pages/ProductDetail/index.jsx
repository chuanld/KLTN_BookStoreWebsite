import { useDispatch } from 'react-redux'
import { openModal } from 'features/Auth/userSlice'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footers from '../../../../components/Footer'
import productApi from 'api/productApi'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addToCart } from 'features/Auth/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'

import Breadcrumb from 'components/Breadcrumbs'
import QuickReview from './components/QuickReview'
import HeadingInfo from './components/HeadingInfo'
import RelateProducts from './components/RelateProducts'
import DetailReview from './components/DetailReview'

const { io } = require('socket.io-client')

function DetailProduct() {
  const params = useParams()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.current)

  const [detailProduct, setDetailProduct] = useState([])

  const [onLoad, setOnLoad] = useState(false)
  const [showComments, setShowComment] = useState(false)

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    ;(async function () {
      if (params) {
        const res = await productApi.getProductById(params.id)
        setDetailProduct(res.product)
      }
    })()
  }, [params])

  //Socket ConfigConnection
  useEffect(() => {
    const socket = io('http://localhost:5000', { transports: ['websocket'] })
    setSocket(socket)

    return () => socket.close()
  }, [])

  //Realtime + joinRoom
  useEffect(() => {
    if (socket) {
      socket.emit('johnBookDetail', params.id)
    }
  }, [socket, params.id])

  const addCart = async (productId, qtyAmount) => {
    if (user) {
      const data = {
        productId,
        qtyAmount,
      }

      const action = addToCart(data)
      const resultAction = await dispatch(action)
      const res = unwrapResult(resultAction)
      if (res.status === 1) {
        toast.success(res.msg)
        return
      }
      toast.error(res.msg)
      return
    }
    //openModal
    dispatch(openModal())
  }

  if (detailProduct.length === 0) return null
  return (
    <>
      <Breadcrumb params={params} />
      <div className='detail-product'>
        <HeadingInfo product={detailProduct} onSubmit={addCart} />
        <div className='detail-info'>
          <div className='product_content'>
            <div className='container'>
              <h2 className='title_content'>Nội dung</h2>
              <div className={`box_content ${onLoad ? 'cYhiAl' : 'jpFMBi'}`}>
                <p className='title_content_split'>{detailProduct.content}</p>
                {onLoad ? null : <div className='gradient'></div>}
              </div>
              <button className='btn-more' onClick={() => setOnLoad(!onLoad)}>
                {onLoad ? 'Rút gọn' : 'Xem thêm'}
              </button>
            </div>
          </div>
          <QuickReview
            product={detailProduct}
            onSubmit={() => setShowComment(!showComments)}
          />
        </div>
        {user && showComments ? (
          <DetailReview product={detailProduct} socket={socket} user={user} />
        ) : null}
      </div>
      <RelateProducts
        product={detailProduct}
        params={params}
        setOnLoad={setOnLoad}
      />
      <Footers />
    </>
  )
}

export default DetailProduct
