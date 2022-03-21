import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from 'components/form-controls/InputField'
import PasswordField from 'components/form-controls/PasswordField'

function FormCreateAccount(props) {
  const { onSubmit } = props
  const schema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter valild email'),
    phone: yup
      .string()
      .notRequired('Please enter a phone number')
      .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Phone number is not valid'),
    address: yup.string().required('Please enter your address'),
    role: yup
      .string()
      .required('Default this account is user')
      .matches(/^([0|1])$/, 'Role is not valid')
      .default(0),
    password: yup.string().required('Please choose password').min(6),
  })
  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      address: '',
      phone: '',
      password: '',
      role: 0,
    },
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    form.reset({
      email: '',
      name: '',
      address: '',
      phone: '',
      password: '',
      role: 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSubmit = (values) => {
    if (!onSubmit) return
    onSubmit(values)
    // console.log(values)
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className='createUserFormItem'>
        <div className='createUserItem'>
          <InputField
            name='email'
            placeholder={'Email'}
            form={form}
            label='Email'
            className={'input-info-update'}
            height={'30px'}
            width='260px'
            variant='standard'
          />
        </div>
        <div className='createUserItem'>
          <InputField
            name='name'
            placeholder={'Name display'}
            form={form}
            label='Name'
            className={'input-info-update'}
            height={'30px'}
            width='260px'
            variant='standard'
          />
        </div>
        <div className='createUserItem'>
          <InputField
            name='phone'
            placeholder={'Phone to contact'}
            form={form}
            label='Phone'
            className={'input-info-update'}
            height={'30px'}
            width='260px'
            variant='standard'
          />
        </div>
        <div className='createUserItem'>
          <InputField
            name='address'
            placeholder={'Address for ShipCOD delivery'}
            form={form}
            label='Address'
            className={'input-info-update'}
            height={'26px'}
            width='260px'
            variant='standard'
            // error={true}
            helperText={'This is security data account'}
          />
        </div>
        <div className='createUserItem'>
          <InputField
            name='role'
            placeholder={'Administrator or user account'}
            form={form}
            label='Role'
            className={'input-info-update'}
            height={'30px'}
            width='260px'
            variant='standard'
          />
        </div>
        <div className='createUserItem'>
          <PasswordField
            name='password'
            placeholder='Password'
            form={form}
            label='Password'
            className={'input-info-update'}
            height={'30px'}
            width='260px'
            variant='standard'
          />
        </div>
      </div>
      <button className='createUserButton' type='submit'>
        Create Account
      </button>
    </form>
  )
}

export default FormCreateAccount
