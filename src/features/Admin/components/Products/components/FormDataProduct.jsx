import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from 'components/form-controls/InputField'

import { TextField } from '@mui/material'
import TextAreaField from 'components/form-controls/TextAreaField'
import SelectField from 'components/form-controls/SelectField'

function FormDataProduct(props) {
  const { product, categories, onSubmit } = props
  const schema = yup.object().shape({
    title: yup.string().required('Please enter book title'),
    // email: yup.string().required('Please enter your email').email('Please enter valild email'),
    price: yup
      .number()
      .required('Please enter book price')
      .typeError('Please enter book price'),

    description: yup.string().required('Please enter book description').min(10),
    content: yup.string().required('Please enter book content').min(20),
    author: yup.string().required('Please enter book author'),
    publisher: yup.string().required('Please enter book publisher'),
    category: yup.string().required('Please enter book category'),
    discount: yup
      .number()
      .required('Please enter discount')
      .typeError('Discount invalid!'),
  })

  const form = useForm({
    defaultValues: {
      title: product.title || '',
      price: product.price || '',
      description: product.description || '',
      content: product.content || '',
      author: product.author || '',
      publisher: product.publisher || '',
      category: product.category || '',
      discount: product.discount || '',
      stock: '',
    },
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    product &&
      form.reset({
        title: product.title,
        price: product.price,
        description: product.description,
        content: product.content,
        author: product.author,
        publisher: product.publisher,
        category: product.category,
        discount: 100 - product.discount,
        stock: '',
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const handleSubmit = (values) => {
    if (!onSubmit) return
    onSubmit({ ...values, _id: product._id, discount: 100 - values.discount })
    // console.log(values)
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="row update-info-book">
        <TextField
          // name='productId'
          label="Product ID"
          defaultValue={product._id}
          placeholder={product._id}
          className={'input-info-update'}
          sx={{ height: '30px', width: '560px' }}
          readOnly={true}
          focused
          // variant='standard'
          // error={true}
          helperText={'*This info will not change'}
          // disabled
        />
      </div>

      <div className="row update-info-book">
        <InputField
          name="title"
          placeholder={product.title}
          form={form}
          label="Title Book"
          className={'input-info-update'}
          height={'30px'}
          width="560px"
        />
      </div>

      <div className="row update-info-book rows__cate-disc">
        <InputField
          name="price"
          placeholder={JSON.stringify(product.price)}
          form={form}
          label="Price Book"
          className={'input-info-update'}
          height={'55px'}
          width="260px"
          type="number"
        />
        <InputField
          name="stock"
          placeholder={JSON.stringify(product.totalStock)}
          form={form}
          label="Stock (Book)"
          className={'input-info-update'}
          height={'50px'}
          width="160px"
          type="number"
        />
      </div>

      <div className="row update-info-book">
        <label htmlFor="description">Description</label>
        <TextAreaField
          name="description"
          placeholder={product.description}
          form={form}
          label="Description Book"
          width="560px"
          minRows={5}
        />
      </div>
      <div className="row update-info-book">
        <label htmlFor="content">Content</label>
        <TextAreaField
          name="content"
          placeholder={product.content}
          form={form}
          label="Content Book"
          width="560px"
          minRows={10}
        />
      </div>

      <div className="row update-info-book">
        <InputField
          name="author"
          placeholder={product.author}
          form={form}
          label="Author Book"
          className={'input-info-update'}
          height={'30px'}
          width="560px"
        />
      </div>
      <div className="row update-info-book">
        <InputField
          name="publisher"
          placeholder={product.publisher}
          form={form}
          label="Publisher Book"
          className={'input-info-update'}
          height={'30px'}
          width="560px"
        />
      </div>

      {/* <div className='row'>
        <label htmlFor='categories'>Categories: </label>
        <select name='category' value={product.category}>
          <option value=''>Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div> */}

      <div className="row update-info-book rows__cate-disc">
        <SelectField
          name="category"
          //   placeholder={product.category}
          form={form}
          label="Category"
          height={'55px'}
          width="260px"
          className={'input-info-update'}
          defaulvalue={product.category}
          options={categories}
        />
        <InputField
          name="discount"
          placeholder={JSON.stringify(product.discount)}
          form={form}
          label="% Discount Book"
          className={'input-info-update'}
          height={'50px'}
          width="160px"
          type="number"
        />
      </div>

      <button type="submit">Update Product</button>
    </form>
  )
}

export default FormDataProduct
