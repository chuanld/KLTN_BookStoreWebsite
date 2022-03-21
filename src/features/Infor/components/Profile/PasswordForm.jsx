import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import PasswordField from 'components/form-controls/PasswordField'

function PasswordForm(props) {
  const { user, onSubmit } = props
  const schema = yup.object().shape({
    password: yup.string().required('Please enter your password'),
    newPassword: yup.string().required('Please enter new password').min(6),
    confirmNewpass: yup
      .string()
      .required('Please enter confirm password')
      .oneOf([yup.ref('newPassword')], 'Confirm new password does not match!'),
  })
  const form = useForm({
    defaultValues: {
      //code default
      password: '',
      newPassword: '',
      confirmNewpass: '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    user &&
      form.reset({
        password: user.password,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleSubmit = (values) => {
    if (!onSubmit) return
    onSubmit(values)
  }

  return (
    <form className='userUpdatePass' onSubmit={form.handleSubmit(handleSubmit)}>
      <div className='userUpdateItem'>
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
      <div className='userUpdateItem'>
        <PasswordField
          name='newPassword'
          placeholder='New pass word if you want'
          form={form}
          label='New Password'
          className={'input-info-update'}
          height={'30px'}
          width='260px'
          variant='standard'
        />
      </div>
      <div className='userUpdateItem'>
        <PasswordField
          name='confirmNewpass'
          placeholder='Confirm new password'
          form={form}
          label='Confirm new password'
          className={'input-info-update'}
          height={'30px'}
          width='260px'
          variant='standard'
        />
      </div>
      <div className='row'>
        <button className='userUpdateButton update-password-btn' type='submit'>
          Update Pass
        </button>
        <span className='warning'>
          * If you change password. <br />
          Login the next time you will remember
        </span>
      </div>
    </form>
  )
}

export default PasswordForm
