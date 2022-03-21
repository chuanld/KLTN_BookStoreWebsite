import productApi from 'api/productApi'
import ProductItem from 'features/Product/components/ProductItem'
import React, { useState, useEffect } from 'react'
// import pic1 from "./images/product_01.jpg";
// import pic2 from "./images/product_02.jpg";
import { Link } from 'react-router-dom'

function Intro() {
  // const state = useContext(GlobalState);
  // const [newProductHome] = state.productsApi.newProductHome;
  const [newProducts, setNewProducts] = useState([])
  const getNewProducts = async () => {
    try {
      const res = await productApi.getProducts({
        limit: 4,
        sort: 'oldest',
      })
      setNewProducts(res.products)
    } catch (err) {}
  }
  useEffect(() => {
    getNewProducts()
  }, [])
  return (
    <div className='latest-products'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='section-heading'>
              <h2>Latest Products</h2>
              <Link to='/products'>
                view all products <i className='fa fa-angle-right'></i>
              </Link>
            </div>
          </div>

          {newProducts.length !== 0 &&
            newProducts.map((product) => (
              <ProductItem product={product} key={product._id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Intro
