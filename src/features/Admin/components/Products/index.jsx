import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom'
import adminApi from 'api/adminApi'
import withLoading from 'components/HOC/withLoading'
import TableProduct from './components/TableProduct'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FilterTab from './components/FilterTab'
import Paginate from './components/Paginate'
import Breadcrumb from 'components/Breadcrumbs'

const queryString = require('query-string')

function Products({ showLoading, hideLoading }) {
  const location = useLocation()
  const history = useHistory()
  const { path } = useRouteMatch()
  const [products, setProducts] = useState([])
  const [, setPage] = useState()
  const [totalPage, setTotalPage] = useState()
  const [result, setResult] = useState()
  const [totalResult, setTotalResult] = useState()
  // const [loadingSkt, setLoadingSkt] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)

  const [, setLoading] = useState(false)
  const [onCheck, setOnCheck] = useState(false)
  const [isCheck, setIsCheck] = useState(false)
  const [enableDel, setEnableDel] = useState(false)
  const [callback, setCallback] = useState(false)

  const [selectionRow, setSelectionRow] = useState([])
  const submitSelectRow = (selects) => {
    setSelectionRow(selects)
  }

  const deletePro = async (id, tagId, public_id) => {
    console.log(id, tagId, public_id, 'item to remove')
    deleteSubmit(id, tagId, public_id)
  }
  const submitDeleteSelect = async () => {
    selectionRow.forEach((select) => {
      products.forEach((product) => {
        if (product._id === select.toString()) {
          deletePro(product._id, product.product_id, product.images.public_id)
        }
      })
    })
  }

  //getQueryParams
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    console.log(params, 'queryParams Product Admin')
    return {
      ...params,
    }
  }, [location.search])

  //getData
  const getListProduct = useCallback(async () => {
    try {
      // showLoading()
      setLoadingTable(true)
      const res = await adminApi.getListProduct(queryParams)
      setProducts(res.products)
      setPage(res.page)
      setResult(res.result)
      setTotalResult(res.totalResult)
      setTotalPage(Math.ceil(res.totalResult / 9))
    } catch (err) {}
    setLoadingTable(false)
    // hideLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])
  useEffect(() => {
    getListProduct()
  }, [queryParams, getListProduct, callback])

  //Filter Changes
  const handleFilterChange = (values) => {
    console.log(values, 'filterValues Product Admin')
    const filters = {
      ...values,
    }
    if (filters['title[regex]'] === ' ') {
      delete filters['title[regex]']
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const handleDeleteAll = async () => {
    // This func dangerously @@!!
    // await products.forEach(product=>{
    //   if(product.checked){
    //     deleteSubmit(product._id,product.product_id, product.images.public_id)
    //   }
    // })
  }

  //Func for deleteItem (oldVersion)=> use product.checked
  // const handleClickMulti = () => {
  //   if (!onCheck) {
  //     setOnCheck(true)
  //     setIsCheck(false)
  //     products.forEach((product) => {
  //       product.checked = false
  //     })
  //     setProducts([...products])
  //   } else {
  //     setOnCheck(false)
  //     setEnableDel(false)
  //   }
  // }
  const handleClickCheck = (id) => {
    console.log(id)
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked
    })
    console.log(products)
    setProducts([...products])
    setEnableDel(true)
  }
  const handleCheckAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck
    })
    setProducts([...products])
    setIsCheck(!isCheck)
    if (!enableDel) {
      setEnableDel(true)
    }
  }
  const deleteSubmit = async (id, tagId, public_id) => {
    console.log(id, tagId, public_id, 'deleteSubmit')
    try {
      showLoading()
      if (window.confirm(`Are you sure delete product ${tagId} ?`)) {
        setLoading(true)
        // const destroyImg = await axiosClient.post(
        //   "/api/destroy",
        //   { public_id: public_id },
        //   {
        //     headers: { Authorization: token },
        //   }
        // );

        // const deleteProduct = await axiosClient.delete(`/api/products/${id}`, {
        //   headers: { Authorization: token },
        // });
        const removeImg = await adminApi.removeImg({ public_id: public_id })
        const deleteProduct = await adminApi.removeProduct(id)
        setLoading(false)
        setOnCheck(false)
        setEnableDel(false)
        setCallback(!callback)
        toast.success(removeImg.msg)
        toast.success(deleteProduct.msg)
      }
    } catch (err) {
      toast.error(err.response.data.msg)
    }
    hideLoading()
  }
  return (
    <>
      <div className="session-heading">
        <Breadcrumb />
      </div>
      <div className="productListAdmin">
        <div className="productListTitle">
          <h4>List products in Database</h4>

          <div>
            <div>
              {/* {onCheck && enableDel ? (
                <button
                  className='productDelAllButton'
                  onClick={handleDeleteAll}
                >
                  Delete
                </button>
              ) : null} */}
              {selectionRow.length !== 0 && (
                <button
                  className="productDelAllButton"
                  onClick={submitDeleteSelect}
                >
                  Delete Books
                </button>
              )}

              {/* <button className='productAddButton' onClick={handleClickMulti}>
                {onCheck ? 'Cancel check' : 'Select multiple'}
              </button> */}
              {selectionRow.length === 1 ? (
                <Link to={`${path}/${selectionRow[0].toString()}`}>
                  <button className="productAddButton">Edit Product</button>
                </Link>
              ) : (
                <Link to={`${path}/create`}>
                  <button className="productAddButton">Create Product</button>
                </Link>
              )}
              {/* <Link to={`${path}/create`}>
                <button className='productAddButton'>Create Product</button>
              </Link> */}
            </div>
          </div>
        </div>
        <div className="productListTitle">
          {/* <Link to='/admin/createproduct'>
            <button className='productAddButton'>Create Product</button>
          </Link> */}
          {onCheck ? (
            <div className="multiselect">
              <span>Select all</span>
              <input
                type="checkbox"
                checked={isCheck}
                onChange={handleCheckAll}
              />
            </div>
          ) : null}
        </div>
        {/*  */}

        <div className="userList_toolbar_wrapper">
          <FilterTab params={queryParams} onSubmit={handleFilterChange} />
        </div>
        <div className="productsList">
          <TableProduct
            products={products}
            deleteSubmit={deleteSubmit}
            onCheck={onCheck}
            handleClickCheck={handleClickCheck}
            loadingTable={loadingTable}
            selectionRow={selectionRow}
            submitSelectRow={submitSelectRow}
          />
        </div>
        {/* {products.length === 0 && <Loading />} */}
        <div className="pagination-container">
          <Paginate
            params={queryParams}
            totalPage={totalPage}
            onSubmit={handleFilterChange}
          />
          <div className="userlist_result">
            <div className="result_account"></div>
            <div></div>
            <div>
              <span>
                Showing{' '}
                <i>
                  1-{result} of {totalResult}
                </i>{' '}
                books
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withLoading(Products)
