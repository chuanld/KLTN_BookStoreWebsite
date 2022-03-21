import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import InputField from 'components/form-controls/InputField'
import PasswordField from 'components/form-controls/PasswordField'

function RegisterForm(props) {
  const { onSubmit } = props
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email')
      .email('Email invalid'),
    password: yup.string().required('Please retype password').min(6),
  })

  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirm: '',
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = (values) => {
    if (!onSubmit) return
    onSubmit(values)
  }
  return (
    <div className='form-containerlg sign-up-containerlg '>
      <form className='formlg' onSubmit={form.handleSubmit(handleSubmit)}>
        <h1>Sign up</h1>
        <div className='social-containerlg'>
          <div className='social'>
            <div className='btn-google-signup'>
              <GoogleLogin
                clientId='777528100895-q05tshbqhfjh7goc71g50gea3mnmuotj.apps.googleusercontent.com'
                buttonText='Login with google'
                // onSuccess={registerGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>

            <div className='btn-facebook-signup'>
              <FacebookLogin
                // appId="270618948409992"
                appId='1176374546224175'
                autoLoad={false}
                fields='id,name,email,picture'
                icon='fa-facebook'
                // callback={registerFacebook}
              />
            </div>
          </div>
        </div>
        {/* <span>or use your email for registration</span> */}
        <div className='input-signup'>
          <InputField
            name='email'
            placeholder='Email'
            form={form}
            label='Email'
            className={'input-field'}
            height={'35px'}
            width='260px'
          />
        </div>
        <div className='input-signup'>
          <InputField
            name='name'
            placeholder='Name'
            form={form}
            label='Name'
            className={'input-field'}
            height={'35px'}
            width='260px'
          />
        </div>
        <div className='input-signup'>
          <PasswordField
            name='password'
            placeholder='Password'
            form={form}
            label='Password'
            className={'input-field'}
            height={'35px'}
            width='260px'
          />
        </div>
        <div className='input-signup'>
          <PasswordField
            name='confirm'
            placeholder='Confirm'
            form={form}
            label='Confirm'
            className={'input-field'}
            height={'35px'}
            width='260px'
          />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default RegisterForm
