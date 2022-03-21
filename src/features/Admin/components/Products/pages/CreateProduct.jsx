import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams, useHistory } from 'react-router-dom'
import withLoading from 'components/HOC/withLoading'
import adminApi from 'api/adminApi'
import categoryApi from 'api/categoryApi'
import Loading from 'components/loading/Loading'
import FormCreateProduct from '../components/FormCreateProduct'

function CreateProduct({ showLoading, hideLoading }) {
  const param = useParams()
  const history = useHistory()
  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)
  //   const [callback, setCallback] = useState(false)

  const getListCategory = async () => {
    try {
      const res = await categoryApi.getCategories()
      setCategories(res)
    } catch (err) {}
  }
  useEffect(() => {
    getListCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id])

  const handleUpload = async (e) => {
    //code
    e.preventDefault()
    try {
      const file = e.target.files[0]
      if (!file) return toast.warn('File not exist!')

      if (file.size > 1024 * 1024) return toast.warn('Size too big. Try again')

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return toast.warn('File format is incorrect')
      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await adminApi.uploadImg(formData)
      setLoading(false)
      setImages(res)
      toast.success('Update product information successfully')
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }
  const styleUpload = {
    display: images ? 'block' : 'none',
  }
  const handleDestroy = async () => {
    try {
      setLoading(true)
      await adminApi.removeImg(images.public_id)
      setLoading(false)
      setImages(false)
      toast.success('Remove image successfully')
      toast.warn('Product must has Image for sale. Let select new image')
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }
  const handlePushBook = async (values) => {
    console.log(values, 'data form productAdmin')
    try {
      showLoading()
      await adminApi.addProduct(values, images)
      history.push('/admin/products')
      setImages(false)
      setProduct({})
      toast.success('Update product information successfully')
    } catch (err) {
      toast.error(err.response.data.msg)
    }
    hideLoading()
  }
  return (
    <div className='create_product'>
      <div className='uploadimg'>
        <input type='file' name='file' id='file_up' onChange={handleUpload} />
        {loading ? (
          <div id='file_img'>
            <Loading />
          </div>
        ) : (
          <div id='file_img' style={styleUpload}>
            <img src={images ? images.url : ''} alt='' />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <FormCreateProduct
        product={product}
        onSubmit={handlePushBook}
        categories={categories}
      />
    </div>
  )
}

export default withLoading(CreateProduct)
