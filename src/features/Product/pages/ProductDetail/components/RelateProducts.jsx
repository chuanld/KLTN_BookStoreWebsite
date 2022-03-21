import React, { useState, useEffect } from 'react'
import ProductItem from 'features/Product/components/ProductItem'
import productApi from 'api/productApi'
import { Link } from 'react-router-dom'

function RelateProducts(props) {
  const { params, product, setOnLoad } = props
  const [relateProduct, setRelateProduct] = useState([])

  const handleScrollTop = () => {
    window.scrollTo({
      top: 130,
      behavior: 'smooth',
    })
    setOnLoad(false)
  }

  useEffect(() => {
    ;(async function () {
      if (params) {
        const data = await productApi.getProducts({
          category: product.category,
          // limit: 4,
        })
        setRelateProduct(data.products)
      }
    })()
  }, [params, product.category])
  return (
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
              key={product._id}
            >
              <ProductItem key={product._id} product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RelateProducts
