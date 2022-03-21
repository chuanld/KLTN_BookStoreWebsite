import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from 'components/form-controls/InputField'

function InformationForm(props) {
  const { user, onSubmit } = props
  const schema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    // email: yup.string().required('Please enter your email').email('Please enter valild email'),
    phone: yup
      .string()
      .notRequired('Please enter a phone number')
      .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Phone number is not valid'),
    address: yup.string().required('Please enter your address'),
  })

  const form = useForm({
    defaultValues: {
      name: user.name || '',
      address: user.address || '',
      phone: user.phone || '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    user &&
      form.reset({
        name: user.name,
        // email: user.email,
        phone: user.phone,
        address: user.address,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleSubmit = (values) => {
    if (!onSubmit) return
    onSubmit(values)
  }
  return (
    <form className='userUpdateInfo' onSubmit={form.handleSubmit(handleSubmit)}>
      <div className='userUpdateItem'>
        <InputField
          name='name'
          placeholder={user.name}
          form={form}
          label='Name'
          className={'input-info-update'}
          height={'30px'}
          width='260px'
          variant='standard'
        />
      </div>
      <div className='userUpdateItem'>
        <InputField
          name='phone'
          placeholder={user.phone}
          form={form}
          label='Phone'
          className={'input-info-update'}
          height={'30px'}
          width='260px'
          variant='standard'
        />
      </div>
      <div className='userUpdateItem'>
        <InputField
          name='address'
          placeholder={user.address}
          form={form}
          label='Address'
          className={'input-info-update'}
          height={'30px'}
          width='260px'
          variant='standard'
        />
      </div>

      <button className='userUpdateButton' type='submit'>
        Update Info
      </button>
    </form>
  )
}

export default InformationForm
