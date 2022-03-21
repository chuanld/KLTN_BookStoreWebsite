import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import userApi from 'api/userApi'

export default function OrderDetail() {
  const params = useParams()
  const history = useHistory()

  const [orderInfoDetail, setOrderInfoDetail] = useState([])

  useEffect(() => {
    ;(async function () {
      if (params.id) {
        // orderInfo.forEach((item) => {
        //   if (item._id === params.id) setOrderInfoDetail(item);
        // });
        const res = await userApi.getOrderInfoDetailById(params.id)
        setOrderInfoDetail(res.orderInfo)
        console.log(res)
      }
    })()
  }, [params.id])
  console.log(orderInfoDetail)

  const handleCancelOrder = async (id) => {
    try {
      if (orderInfoDetail.status !== 0) {
        return toast.success(
          'The order has been approved by the administrator.'
        )
      }
      document.body.classList.add('loading-data')
      if (
        window.confirm(
          'Are you sure cancel this order?. This action cannot be undone!'
        )
      ) {
        const data = {
          id,
          status: 1,
        }
        const res = await userApi.cancelOrder(data)
        history.push('/account/order')
        toast.success(res.msg)
      }
    } catch (err) {
      toast.error(err.response.data.msg)
    }
    document.body.classList.remove('loading-data')
  }

  if (orderInfoDetail.length === 0) return null
  return (
    <div>
      <div className='orderListTitle'>
        <h4>
          Order {orderInfoDetail.orderID} has {orderInfoDetail.cart.length}
          ordered
        </h4>
        {orderInfoDetail.status === 0 ? (
          <button
            className='orderCancelButton'
            onClick={() => handleCancelOrder(orderInfoDetail._id)}
          >
            Cancel order
          </button>
        ) : null}
      </div>
      <div className='ordersList'>
        <table className='orderListOrder'>
          <thead>
            <tr>
              <th>ProductID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Kim Đồng</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {orderInfoDetail.cart.map((item) => (
              <tr key={item._id}>
                <td>{item.product_id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.publisher}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <img src={item.images.url} alt='' height='140px' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
