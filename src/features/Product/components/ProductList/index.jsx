import React, { useContext } from 'react'

import ProductItem from '../ProductItem'
import { Link, useRouteMatch } from 'react-router-dom'

import { BookNotFound02 } from '../../../../template/assets/images/index'

function ProductList(props) {
  const products = props.products
  const { path } = useRouteMatch()
  console.log(path, 'routematch')

  // const [isAdmin] = state.userApi.isAdmin

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await axios.get("/api/products");
  //     setProducts(res.data.products);
  //   };
  //   getProducts();
  // }, [setProducts]);

  return (
    <>
      <div className='products'>
        {/* {loadSklt ? (
          <div className="product_skeleton">
            <SkeletonTheme color="#ddd" highlightColor="#fff">
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
            </SkeletonTheme>
          </div>
        ) : products.length !== 0 ? (
          products.map((product) => {
            return (
              <Link to={`detail/${product._id}`} key={product._id}>
                <ProductItem key={product._id} product={product} />
              </Link>
            );
          })
        ) : (
          <h2>Sorry, No product found </h2>
        )} */}
        {products.length !== 0 ? (
          products.map((product) => {
            return (
              <Link to={`${path}/${product._id}`} key={product._id}>
                <ProductItem key={product._id} product={product} />
              </Link>
            )
          })
        ) : (
          <div className='book_notfound'>
            <h3>Sorry, try search another book</h3>
            <img
              src={BookNotFound02}
              alt=''
              style={{ height: 'auto', width: '270px' }}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ProductList
