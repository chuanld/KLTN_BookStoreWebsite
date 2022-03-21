import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from 'components/form-controls/InputField'
import PasswordField from 'components/form-controls/PasswordField'
import { TextField } from '@mui/material'

function FormDataAccount(props) {
  const { account, onSubmit } = props
  const schema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    // email: yup.string().required('Please enter your email').email('Please enter valild email'),
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
  })

  const form = useForm({
    defaultValues: {
      email: account.email || '',
      name: account.name || '',
      address: account.address || '',
      phone: account.phone || '',
      role: account.role || 0,
    },
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    account &&
      form.reset({
        name: account.name,
        email: account.email,
        phone: account.phone,
        address: account.address,
        role: account.role,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const handleSubmit = (values) => {
    if (!onSubmit) return
    onSubmit(values)
    // console.log(values)
  }
  return (
    <form className='userUpdateForm' onSubmit={form.handleSubmit(handleSubmit)}>
      <div className='userUpdateLeft'>
        <div className='userUpdateItem'>
          <InputField
            name='email'
            placeholder={account.email}
            form={form}
            label='Email'
            className={'input-info-update'}
            height={'30px'}
            width='260px'
            variant='standard'
            disable={true}
          />
        </div>
        <div className='userUpdateItem'>
          <InputField
            name='name'
            placeholder={account.name}
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
            placeholder={account.phone}
            form={form}
            label='Phone'
            className={'input-info-update'}
            height={'30px'}
            width='260px'
            variant='standard'
          />
        </div>
      </div>
      <div className='userUpdateRight'>
        <div className='userUpdateItem'>
          <InputField
            name='address'
            placeholder={account.address}
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
        <div className='userUpdateItem'>
          <TextField
            name='password'
            placeholder='Security'
            label='Password'
            className={'input-info-update'}
            sx={{ height: '30px', width: '260px' }}
            variant='standard'
            // error={true}
            helperText={'This is security data account'}
            disabled
          />
        </div>
        <div className='userUpdateItem'>
          <InputField
            name='role'
            placeholder={JSON.stringify(account.role)}
            form={form}
            label='Role'
            className={'input-info-update'}
            height={'30px'}
            width='260px'
            variant='standard'
          />
        </div>
        <button className='userUpdateButton' type='submit'>
          Update
        </button>
      </div>
    </form>
  )
}

export default FormDataAccount
