import React from 'react'
import { Link } from 'react-router-dom'
import { Delete } from '@mui/icons-material'
import './styles.css'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { addToCart, deleteCartItem } from 'features/Auth/userSlice'
import { formatCurrency } from 'utils/Format'

function ListCart(props) {
  const { cart } = props
  const dispatch = useDispatch()

  //Check null
  if (cart.length === 0)
    return (
      <>
        <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>
          Cart empty
          {/* {<Loading />} */}
        </h2>
      </>
    )
  //action button count
  const increment = async (productId) => {
    const data = {
      productId,
      qtyAmount: 1,
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

  const decrement = async (productId) => {
    // cart.forEach((item) => {
    //   if (item._id === id) {
    //     item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1)
    //   }
    // })
    // const newCart = [...cart]
    // onSubmit(newCart)
    const data = {
      productId,
      qtyAmount: -1,
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

  //   //Delete cartItem
  const removeCartItem = async (id) => {
    if (window.confirm('Are you sure, product will remove from your Cart')) {
      const action = deleteCartItem(id)
      const resultAction = await dispatch(action)
      const res = unwrapResult(resultAction)
      if (res.status === 1) {
        toast.success(res.msg)
        return
      }
      toast.error(res.msg)
      return
    }
  }

  return (
    <>
      <div className="list_container">
        {cart.map((product) => (
          <div className="listcart" key={product._id}>
            <Link to={`products/${product._id}`}>
              <img src={product.images.url} alt="" className="img_container" />
            </Link>
            <div className="listcart-detail">
              <div className="row">
                <h2>{product.title}</h2>
                <h6>#{product.product_id}</h6>
              </div>
              <div>
                <span
                  style={
                    product.priceDiscount
                      ? {
                          color: '#ddd',
                          fontStyle: 'italic',
                          textDecoration: 'line-through',
                        }
                      : product.discount < 100
                      ? {
                          color: '#ddd',
                          fontStyle: 'italic',
                          textDecoration: 'line-through',
                        }
                      : {}
                  }
                >
                  {formatCurrency(product.price)}
                </span>
                {product.priceDiscount ? (
                  <span className="price-discount">
                    {formatCurrency(product.priceDiscount)}
                  </span>
                ) : product.discount < 100 ? (
                  <span className="price-discount">
                    {formatCurrency((product.price * product.discount) / 100)}
                  </span>
                ) : null}
              </div>

              <p>Tác giả: {product.author}</p>
              <p>NXB: {product.publisher}</p>
              <p>Đã mua: {product.sold}</p>
            </div>
            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span> {product.quantity} </span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>
            <div className="delete" onClick={() => removeCartItem(product._id)}>
              <Delete />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ListCart
