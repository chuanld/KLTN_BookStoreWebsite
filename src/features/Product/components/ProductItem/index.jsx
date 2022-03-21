import { Rating } from '@mui/material'
import React, { useState } from 'react'

function ProductItem({ product }) {
  //const state = useContext(GlobalState);
  //const addCart = state.userApi.addCart;
  const [isPromo, setIsPromo] = useState(false)
  const rate = product.rating / product.countReviews || 0

  return (
    <>
      <div className='product_card'>
        <img src={product.images.url} alt='' width='10px' />
        <div className='product_box'>
          <div className='product_box_item'>
            <h4 title={product.title}>{product.title}</h4>
            {/* <div className='discount'>-15%</div> */}
            {isPromo && <div className='logo-discount'>-15%</div>}
          </div>

          <div className='product_box_item'>
            <div className='original'>
              <h6
                style={
                  isPromo
                    ? {
                        textDecoration: 'line-through',
                        fontStyle: 'italic',
                        color: 'rgb(147 160 151)',
                      }
                    : {}
                }
              >
                ${product.price}
              </h6>
            </div>
            {isPromo && (
              <div className='current-price'>
                <h6> ${product.price - (product.price * 15) / 100}</h6>
              </div>
            )}
          </div>
          <div className='product_box_item'>
            <p>Sold: {product.sold}</p>

            <div className='rating'>
              {rate >= 3 && (
                <>
                  <p>({product.countReviews})</p>
                  <Rating value={rate} size='small' precision={0.25} readOnly />
                </>
              )}
            </div>
          </div>

          <p>Author: {product.author}</p>
        </div>
        {/* {rate >= 3 && (
          <div className='rating'>
            <Rating value={rate} size='small' precision={0.25} readOnly />
          </div>
        )} */}
      </div>
    </>
  )
}

export default ProductItem

// ss
// <div className="product_card">
//       <img src={product.images.url} alt="" width="10px" />
//       <div className="product_box">
//         <h4 title={product.title}>{product.title}</h4>
//         <h6>${product.price}</h6>
//         <p>Sold: {product.sold}</p>
//         <p>Author: {product.author}</p>
//       </div>
//       {/* <div className="row_btn">
//           <Link to="#">
//             <button id="btn_buy" onClick={() => addCart(product)}>
//               Buy
//             </button>
//           </Link>
//           <Link to={`detail/${product._id}`}>
//             <button id="btn_view">View</button>
//           </Link>
//         </div> */}
//       {/* </Link> */}
//     </div>
//     ss
