import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from 'components/form-controls/InputField'

import TextAreaField from 'components/form-controls/TextAreaField'
import SelectField from 'components/form-controls/SelectField'

function FormCreateProduct(props) {
  const { product, categories, onSubmit } = props
  const schema = yup.object().shape({
    product_id: yup.string().required('Please enter book Tag ID'),
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
  })

  const form = useForm({
    defaultValues: {
      product_id: product.product_id || '',
      title: product.title || '',
      price: product.price || 0,
      description: product.description || '',
      content: product.content || '',
      author: product.author || '',
      publisher: product.publisher || '',
      category: product.category || '',
    },
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    product &&
      form.reset({
        product_id: product.product_id,
        title: product.title,
        price: product.price,
        description: product.description,
        content: product.content,
        author: product.author,
        publisher: product.publisher,
        category: product.category,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const handleSubmit = (values) => {
    if (!onSubmit) return
    onSubmit({ ...values })
    // console.log(values)
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="row update-info-book">
        <InputField
          name="product_id"
          placeholder={product.product_id}
          form={form}
          label="TagID Book"
          className={'input-info-update'}
          height={'30px'}
          width="560px"
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

      <div className="row update-info-book">
        <InputField
          name="price"
          placeholder={JSON.stringify(product.price)}
          form={form}
          label="Price Book"
          className={'input-info-update'}
          height={'30px'}
          width="560px"
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

      <div className="row update-info-book">
        <SelectField
          name="category"
          form={form}
          label="Category"
          height={'55px'}
          width="260px"
          defaulvalue={product.category}
          options={categories}
        />
      </div>
      <button type="submit">Update Product</button>
    </form>
  )
}

export default FormCreateProduct
