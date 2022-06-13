import InputField from 'components/form-controls/InputField'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState, useRef } from 'react'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import categoryApi from 'api/categoryApi'
import adminApi from 'api/adminApi'
import productApi from 'api/productApi'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useSelector } from 'react-redux'
import DateTimePickerField from 'components/form-controls/DateTimePickerField'

function FormAddVoucher({ onSubmit }) {
  const info = useSelector((state) => state.user.current)
  const [optionDisc, setOptionDisc] = useState('voucherProductId')
  const schema = yup.object().shape({
    voucherCode: yup.string().required('Voucher code is required'),
    voucherDiscount: yup
      .number()
      .required('Please enter voucher discount')
      .typeError('Voucher discouht must be a number'),
    voucherStock: yup.number().required('Please enter stock').max(100).min(0),
    // voucherCategory: yup.array(),
    voucherExpire: yup.date().required('Please enter expire date'),
    voucherEffect: yup.date(),
  })

  const form = useForm({
    defaultValues: {
      voucherCode: '',
      voucherDiscount: '',
      voucherStock: 0,
      //   voucherCategory: voucher.voucherCategory || [],
      voucherExpire: new Date(),
      voucherEffect: '',
    },
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    onSubmit &&
      form.reset({
        voucherCode: '',
        voucherDiscount: '',
        voucherStock: 0,
        // voucherCategory: voucher.voucherCategory || [],
        voucherExpire: new Date(),
        voucherEffect: '',
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSubmit])

  const handleSubmit = (values) => {
    if (!onSubmit) return
    // onSubmit({ ...values })

    const newValues = {
      ...values,
      voucherExpire: values.voucherExpire.toISOString(),
      voucherEffect: values.voucherEffect.toISOString(),
      //   voucherId: voucher._id,
      voucherProductId: bookIdsDisc,
      voucherProductCategory: categoriesDisc,
      voucherProductAuthor: authorsDisc,
      voucherProductPublisher: publishersDisc,
      modifiedBy: info.name,
    }
    onSubmit(newValues)
  }
  const handleChangeOption = (e) => {
    setOptionDisc(e.target.value)
  }

  //impotant use update form
  const [bookIdsDisc, setBookIdsDisc] = useState([])
  const [bookIdSelect, setBookIdSelect] = useState('')
  const [product, setProduct] = useState({})
  const [isVerify, setIsVerify] = useState(false)
  const typingTimeOutRef = useRef(null)
  const onChangeInputID = (e) => {
    setIsVerify(false)
    setBookIdSelect(e.target.value)
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current)
    }
    typingTimeOutRef.current = setTimeout(() => {
      const check = bookIdsDisc.some((item) => item === e.target.value)
      if (check) return toast.warn('Book ID already exist!')
      findBookById(e.target.value)
    }, 2000)
  }
  const findBookById = async (id) => {
    try {
      const res = await productApi.getProductById(id)
      setProduct(res.product)
    } catch (err) {}
  }
  useEffect(() => {
    if (product && bookIdSelect !== '') {
      setIsVerify(true)
      return
    }
  }, [product])
  const handleAddBookId = () => {
    if (bookIdSelect === '') return
    if (!isVerify) return toast.warn('Book ID invalid!')
    const check = bookIdsDisc.some((item) => item === bookIdSelect)
    if (check) return toast.warn('Book ID already exist!')
    const newBookIdsDisc = [...bookIdsDisc, bookIdSelect]
    setBookIdsDisc(newBookIdsDisc)
    setIsVerify(false)
    setProduct()

    // setCategoriesDisc(...newCategoriesDisc, cateSelect)
  }
  const handleRemoveItemBookId = (item) => {
    if (!item) return
    console.log(item)
    const check = bookIdsDisc.some((bookId) => bookId === item)
    if (!check) return toast.warn('Book ID is not exist!')
    const newBookIdsDisc = bookIdsDisc.filter((bookId) => {
      return bookId !== item
    })
    setBookIdsDisc(newBookIdsDisc)
  }

  const [categories, setCategories] = useState([])
  //impotant use update form
  const [categoriesDisc, setCategoriesDisc] = useState([])
  const [cateSelect, setCateSelect] = useState('')

  const [authors, setAuthors] = useState([])
  //important use update form
  const [authorsDisc, setAuthorsDisc] = useState([])
  const [authSelect, setAuthSelect] = useState('')

  const [publishers, setPublishers] = useState([])
  //important use update form
  const [publishersDisc, setPublishersDisc] = useState([])
  const [publshSelect, setPublshSelect] = useState('')

  const getCategories = async () => {
    try {
      const res = await categoryApi.getCategories()
      setCategories(res)
    } catch (err) {}
  }
  const getAuthors = async () => {
    try {
      const res = await adminApi.getAllProducts()
      let authors = []
      authors = res.allproducts.reduce((unique, item) => {
        return unique.includes(item.author) ? unique : [...unique, item.author]
      }, [])
      setAuthors(authors)
    } catch (err) {}
  }
  const getPublishers = async () => {
    try {
      const res = await adminApi.getAllProducts()
      let publishers = []
      publishers = res.allproducts.reduce((unique, item) => {
        return unique.includes(item.publisher)
          ? unique
          : [...unique, item.publisher]
      }, [])
      setPublishers(publishers)
    } catch (err) {}
  }
  useEffect(() => {
    if (optionDisc === 'voucherProductCategory') {
      getCategories()
      return
    }
    if (optionDisc === 'voucherProductAuthor') {
      getAuthors()
    }
    if (optionDisc === 'voucherProductPublisher') {
      getPublishers()
    }
  }, [optionDisc])
  useEffect(() => {
    // setBookIdsDisc(voucher.voucherProductId)
    // setCategoriesDisc(voucher.voucherProductCategory)
    // setAuthorsDisc(voucher.voucherProductAuthor)
    // setPublishersDisc(voucher.voucherProductPublisher)
  }, [])
  const handleSelectDiscount = (e) => {
    if (optionDisc === 'voucherProductCategory') {
      setCateSelect(e.target.value)
      return
    }
    if (optionDisc === 'voucherProductAuthor') {
      setAuthSelect(e.target.value)
      return
    }
    if (optionDisc === 'voucherProductPublisher') {
      setPublshSelect(e.target.value)
      return
    }
  }
  const handleAddCategory = () => {
    if (cateSelect === '') return
    const check = categoriesDisc.some((item) => item === cateSelect)
    if (check) return toast.warn('Category already exist!')
    const newCategoriesDisc = [...categoriesDisc, cateSelect]
    setCategoriesDisc(newCategoriesDisc)
    // setCategoriesDisc(...newCategoriesDisc, cateSelect)
  }
  const handleAddAuthor = () => {
    if (authSelect === '') return
    const check = authorsDisc.some((item) => item === authSelect)
    if (check) return toast.warn('Author already exist!')
    const newAuthorsDisc = [...authorsDisc, authSelect]
    setAuthorsDisc(newAuthorsDisc)
  }
  const handleAddPublisher = () => {
    if (publshSelect === '') return
    const check = publishersDisc.some((item) => item === publshSelect)
    if (check) return toast.warn('Publisher already exist!')
    const newPublishersDisc = [...publishersDisc, publshSelect]
    setPublishersDisc(newPublishersDisc)
  }
  const handleRemoveItemCategory = (item) => {
    if (!item) return
    console.log(item)
    const check = categoriesDisc.some((cate) => item === cate)
    if (!check) return
    const newCategoriesDisc = categoriesDisc.filter((cate) => {
      return cate !== item
    })
    setCategoriesDisc(newCategoriesDisc)
  }
  const handleRemoveItemAuthor = (item) => {
    if (!item) return
    console.log(item)
    const check = authorsDisc.some((cate) => item === cate)
    if (!check) return
    const newAuthorsDisc = authorsDisc.filter((author) => {
      return author !== item
    })
    setAuthorsDisc(newAuthorsDisc)
  }
  const handleRemoveItemPublisher = (item) => {
    if (!item) return
    console.log(item)
    const check = publishersDisc.some((publsh) => item === publsh)
    if (!check) return
    const newPublishersDisc = publishersDisc.filter((publsh) => {
      return publsh !== item
    })
    setPublishersDisc(newPublishersDisc)
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className='edit-info-form'>
        <div className='edit-info-heading'>
          <div className='col1-info'>
            <div className='update-info-voucher'>
              <InputField
                name='voucherCode'
                placeholder='Voucher code'
                form={form}
                label='Voucher CODE'
                className={'input-info-update'}
                height={'30px'}
                width='180px'
              />
            </div>
            <div className='update-info-voucher'>
              <InputField
                name='voucherDiscount'
                placeholder='% discount'
                form={form}
                label='Voucher Discount(%)'
                className={'input-info-update'}
                height={'30px'}
                width='180px'
              />
            </div>
          </div>
          <div className='col2-info'>
            <div className='update-info-voucher'>
              <DateTimePickerField
                name='voucherEffect'
                label='Effect Date'
                form={form}
                className={'input-info-update'}
                height={'30px'}
                width='220px'
              />
            </div>
            <div className='update-info-voucher'>
              <InputField
                name='voucherStock'
                placeholder='Stock'
                form={form}
                label='Voucher Stock'
                className={'input-info-update'}
                height={'30px'}
                width='180px'
              />
            </div>
            {/* <div className='update-info-voucher'>
              <TextField
                name='createdAt'
                // placeholder={voucher.voucherCode}
                // form={form}
                label='Created By'
                className={'input-info-update'}
                sx={{ height: '30px', width: '180px' }}
                value={voucher.createdBy}
                margin='dense'
                disabled
              />
            </div>
            <div className='update-info-voucher'>
              <TextField
                name='modifiedBy'
                // placeholder={voucher.voucherCode}
                // form={form}
                label='Modified By'
                className={'input-info-update'}
                sx={{ height: '30px', width: '180px' }}
                value={voucher.modifiedBy}
                margin='dense'
                disabled
              />
            </div> */}
          </div>
          <div className='col3-info'>
            <div className='update-info-voucher'>
              <DateTimePickerField
                name='voucherExpire'
                label='Expire Date'
                form={form}
                className={'input-info-update'}
                height={'30px'}
                width='220px'
              />
            </div>
            <div className='update-info-voucher'></div>
            <div className='update-info-voucher'></div>
            {/* <div className='update-info-voucher'>
              <TextField
                name='createdAt'
                // placeholder={voucher.voucherCode}
                // form={form}
                label='Created By'
                className={'input-info-update'}
                sx={{ height: '30px', width: '260px' }}
                value={new Date(voucher.createdAt).toUTCString()}
                margin='dense'
                disabled
              />
            </div>
            <div className='update-info-voucher'>
              <TextField
                name='updatedBy'
                // placeholder={voucher.voucherCode}
                // form={form}
                label='Updated At'
                className={'input-info-update'}
                sx={{ height: '30px', width: '260px' }}
                value={new Date(voucher.updatedAt).toUTCString()}
                margin='dense'
                disabled
              />
            </div> */}
          </div>
        </div>
        <div></div>
        <div className='customes-discount'>
          <div className='custome-title'>
            <i>Select customes discount</i>
          </div>
          <div className='custome-wrapper'>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              value={optionDisc}
              onChange={handleChangeOption}
            >
              <FormControlLabel
                value='voucherProductId'
                control={<Radio />}
                label='Book ID'
              />
              <FormControlLabel
                value='voucherProductCategory'
                control={<Radio />}
                label='Book Categories'
              />
              <FormControlLabel
                value='voucherProductAuthor'
                control={<Radio />}
                label='Book Author'
              />
              <FormControlLabel
                value='voucherProductPublisher'
                // disabled
                control={<Radio />}
                label='Book Publishers'
              />
            </RadioGroup>
          </div>
        </div>
        <div className='edit-info-discount'>
          {optionDisc === 'voucherProductId' && (
            <div className='select-discount'>
              <div className='select-bookid select-item'>
                <TextField
                  color={'success'}
                  name='bookIdSelect'
                  label='Book ID'
                  placeholder={'Enter ID book'}
                  onChange={onChangeInputID}
                  value={bookIdSelect}
                  // error={invalid}
                  // helperText={error?.message}
                  sx={{ height: '222,4', width: '50' }}
                  margin='dense'
                />
                <div className={`icon-verifyId ${isVerify && 'active'} `}>
                  <span>✔</span>
                </div>
              </div>
              <div
                className='add-select add-category  select-item'
                onClick={() => handleAddBookId()}
              >
                Add
              </div>
              <div className='show-discount  select-item'>
                <div className='discount-hastag-container'>
                  {bookIdsDisc.map((item) => (
                    <>
                      <div
                        className='discount-hastag-wrapper __category'
                        key={item}
                      >
                        <span className='discount-hastag-item'>{item}</span>
                        <span
                          className='discount-hastag-close'
                          onClick={() => handleRemoveItemBookId(item)}
                        >
                          X
                        </span>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}

          {optionDisc === 'voucherProductCategory' && (
            <div className='select-discount'>
              <div className='select-categories select-item'>
                <FormControl sx={{ m: 0, width: 270, marginTop: 1 }}>
                  <InputLabel id='option-discount'>Select Category</InputLabel>
                  <Select
                    color={'success'}
                    name='category-discount'
                    labelId='category-discount'
                    label='category-discount'
                    // placeholder={placeholder}
                    //   onBlur={onBlur}
                    onChange={handleSelectDiscount}
                    // defaulvalue={values.discOption1}
                    // value={values.discOption1}

                    style={{ height: '55px', width: '250px' }}
                  >
                    {/* <MenuItem value=''></MenuItem> */}
                    {categories.map((category) => (
                      <MenuItem value={category.name} key={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div
                className='add-select add-category  select-item'
                onClick={() => handleAddCategory()}
              >
                Add
              </div>
              <div className='show-discount  select-item'>
                <div className='discount-hastag-container'>
                  {categoriesDisc.map((item) => (
                    <>
                      <div
                        className='discount-hastag-wrapper __category'
                        key={item}
                      >
                        <span className='discount-hastag-item'>{item}</span>
                        <span
                          className='discount-hastag-close'
                          onClick={() => handleRemoveItemCategory(item)}
                        >
                          X
                        </span>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}

          {optionDisc === 'voucherProductAuthor' && (
            <div className='select-discount'>
              <div className='select-authors select-item'>
                <FormControl sx={{ m: 0, width: 270, marginTop: 1 }}>
                  <InputLabel id='option-discount'>Select Author</InputLabel>
                  <Select
                    color={'success'}
                    name='author-discount'
                    labelId='author-discount'
                    label='author-discount'
                    // placeholder={placeholder}
                    //   onBlur={onBlur}
                    onChange={handleSelectDiscount}
                    // defaulvalue={values.discOption1}
                    // value={values.discOption1}

                    style={{ height: '55px', width: '250px' }}
                  >
                    {/* <MenuItem value=''></MenuItem> */}
                    {authors.map((author) => (
                      <MenuItem value={author} key={author}>
                        {author}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div
                className='add-select add-author  select-item'
                onClick={() => handleAddAuthor()}
              >
                Add
              </div>
              <div className='show-discount  select-item'>
                <div className='discount-hastag-container'>
                  {authorsDisc.map((item) => (
                    <>
                      <div
                        className='discount-hastag-wrapper __author'
                        key={item}
                      >
                        <span className='discount-hastag-item'>{item}</span>
                        <span
                          className='discount-hastag-close'
                          onClick={() => handleRemoveItemAuthor(item)}
                        >
                          X
                        </span>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}

          {optionDisc === 'voucherProductPublisher' && (
            <div className='select-discount'>
              <div className='select-publishers select-item'>
                <FormControl sx={{ m: 0, width: 270, marginTop: 1 }}>
                  <InputLabel id='option-discount'>Select Author</InputLabel>
                  <Select
                    color={'success'}
                    name='publisher-discount'
                    labelId='publisher-discount'
                    label='publisher-discount'
                    // placeholder={placeholder}
                    //   onBlur={onBlur}
                    onChange={handleSelectDiscount}
                    // defaulvalue={values.discOption1}
                    // value={values.discOption1}

                    style={{ height: '55px', width: '250px' }}
                  >
                    {/* <MenuItem value=''></MenuItem> */}
                    {publishers.map((publisher) => (
                      <MenuItem value={publisher} key={publisher}>
                        {publisher}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div
                className='add-select add-publisher  select-item'
                onClick={() => handleAddPublisher()}
              >
                Add
              </div>
              <div className='show-discount  select-item'>
                <div className='discount-hastag-container'>
                  {publishersDisc.map((item) => (
                    <>
                      <div
                        className='discount-hastag-wrapper __publisher'
                        key={item}
                      >
                        <span className='discount-hastag-item'>{item}</span>
                        <span
                          className='discount-hastag-close'
                          onClick={() => handleRemoveItemPublisher(item)}
                        >
                          X
                        </span>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='btn-submit'>
        <button type='submit'>Update Voucher</button>
      </div>
    </form>
  )
}

export default FormAddVoucher
