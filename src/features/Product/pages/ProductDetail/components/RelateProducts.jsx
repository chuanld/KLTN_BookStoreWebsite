import React, { useState, useEffect, useCallback } from 'react'
import ProductItem from 'features/Product/components/ProductItem'
import productApi from 'api/productApi'
import { Link } from 'react-router-dom'

const perPage = 8
let showProducts = []
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
        const data1 = await productApi.getProducts({
          author: product.author,
          // limit: 4,
        })
        const data2 = await productApi.getProducts({
          publisher: product.publisher,
          // limit: 4,
        })
        // setRelateProduct(data.products)
        // console.log(data.products, 'data-relate')
        // console.log(data1.products, 'data1-relate')
        // console.log(data2.products, 'data2-relate')
        const dataToTal = [
          { ...product },
          ...data.products,
          ...data1.products,
          ...data2.products,
        ]

        let dataHandle = []
        dataHandle = dataToTal.filter((item) => {
          return dataHandle.includes(item._id) ? '' : dataHandle.push(item._id)
        })
        console.log(dataHandle)
        setRelateProduct(dataHandle)
      }
    })()
  }, [params, product])

  //Loadmore
  const [relateProducts, setRelateProducts] = useState([])
  const [hideRelateProducts, setHideRelateProducts] = useState([])
  const [next, setNext] = useState(8)
  const loopWithSlice = useCallback(
    (num) => {
      // let start =
      //   relateProduct.length - (perPage + num) < 0
      //     ? 0
      //     : relateProduct.length - (perPage + num)
      // showProducts = relateProduct.slice(start, relateProduct.length)
      // setHideRelateProducts(start)
      // setRelateProducts(showProducts)
      let end =
        relateProduct.length - (perPage + num) < 0
          ? relateProduct.length + 1
          : perPage + num
      showProducts = relateProduct.slice(0, end)
      setHideRelateProducts(end)
      setRelateProducts(showProducts)
    },
    [relateProduct]
  )

  useEffect(() => {
    loopWithSlice(0)
  }, [loopWithSlice])

  const handleLoadMoreProducts = () => {
    loopWithSlice(next)
    setNext(next + perPage)
  }
  return (
    <div className='related_products'>
      <div className='container'>
        <div className='related_title'>
          <h2>Related products</h2>
        </div>

        <div className='products'>
          {relateProducts.map((product) => (
            <Link
              to={`/products/${product._id}`}
              onClick={() => handleScrollTop()}
              key={product._id}
            >
              <ProductItem key={product._id} product={product} />
            </Link>
          ))}
        </div>
        {hideRelateProducts < relateProduct.length && (
          <button className='btn-more' onClick={handleLoadMoreProducts}>
            Load more ({relateProduct.length - hideRelateProducts}) products
          </button>
        )}
      </div>
    </div>
  )
}

export default RelateProducts
