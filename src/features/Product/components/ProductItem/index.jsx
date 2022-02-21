import React from 'react'

function ProductItem({ product }) {
  //const state = useContext(GlobalState);
  //const addCart = state.userApi.addCart;

  return (
    <>
      <div className='product_card'>
        <img src={product.images.url} alt='' width='10px' />
        <div className='product_box'>
          <h4 title={product.title}>{product.title}</h4>
          <h6>${product.price}</h6>
          <p>Sold: {product.sold}</p>
          <p>Author: {product.author}</p>
        </div>
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
