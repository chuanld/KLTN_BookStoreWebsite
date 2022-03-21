import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import InputField from 'components/form-controls/InputField'
import PasswordField from 'components/form-controls/PasswordField'

function LoginForm(props) {
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
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = (values) => {
    if (!onSubmit) return
    onSubmit(values)
  }

  return (
    <div className='form-containerlg sign-in-containerlg '>
      <form className='formlg' onSubmit={form.handleSubmit(handleSubmit)}>
        <h1>Sign in</h1>
        <div className='social-containerlg'>
          <div className='social'>
            <div className='btn-google-signup'>
              <GoogleLogin
                clientId='777528100895-q05tshbqhfjh7goc71g50gea3mnmuotj.apps.googleusercontent.com'
                buttonText='Login with google'
                // onSuccess={loginGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>

            <div className='btn-facebook-signup'>
              <FacebookLogin
                appId='6380483075359895'
                autoLoad={false}
                fields='id,name,email,picture'
                icon='fa-facebook'
                // callback={loginFacebook}
              />
            </div>
          </div>
        </div>
        {/* <span>or use your account</span> */}
        <div className='input-login'>
          <InputField
            name='email'
            placeholder='Email'
            form={form}
            label='Email'
            className='input-field'
            height={'30px'}
            width='260px'
          />
        </div>
        <div className='input-login'>
          <PasswordField
            name='password'
            placeholder='Password'
            form={form}
            label='Pasword'
            height='70px'
            width='260px'
          />
        </div>
        <Link to='/forgot'>Forgot your password?</Link>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default LoginForm
