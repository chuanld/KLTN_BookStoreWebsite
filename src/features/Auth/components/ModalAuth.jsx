import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, login, register } from '../userSlice'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { Link, useHistory } from 'react-router-dom'

import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { unwrapResult } from '@reduxjs/toolkit'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const MODE = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
}
function ModalAuth() {
  const history = useHistory()
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.errorMessage)
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
    confirm: '',
  })
  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const [mode, setMode] = useState(MODE.LOGIN)
  const ToogleClass = () => {
    if (mode === MODE.LOGIN) {
      setMode(MODE.REGISTER)
      return
    }
    setMode(MODE.LOGIN)
  }

  const loginSubmit = async (value) => {
    // e.preventDefault()
    const action = login(value)
    const resultAction = await dispatch(action)
    const res = unwrapResult(resultAction)
    console.log(res)
    if (res._id) {
      dispatch(closeModal())
      toast.success('Đăng nhập thành công!')
      return
    }
    toast.error(res)
  }

  const registerSubmit = async (e) => {
    e.preventDefault()

    if (user.confirm === user.password) {
      //------------Code cũ-----------//
      // const result = await axios.post("/user/register", { ...user });

      // localStorage.setItem("firstLogin", true);

      // window.location.href = "/";
      // setMode(MODE.LOGIN);
      // toast.success(result.data.msg);
      //-------------!-----------//

      const action = register(user)
      const resultAction = await dispatch(action)
      const res = unwrapResult(resultAction)
      console.log(res)
      if (res.status === 0) {
        return toast.error(res.data)
      }
      setMode(MODE.LOGIN)
      return toast.success(res.data)
    } else {
      toast.warn('Xác nhận mật khẩu nhập sai')
    }
  }

  return (
    <div className='login-page'>
      <div
        className={`containerlg ${
          mode === MODE.REGISTER ? 'right-panel-activelg' : null
        }`}
        id='container'
      >
        {/* formRegister */}

        <RegisterForm onSubmit={registerSubmit} />
        {/* formLogin */}
        <LoginForm onSubmit={loginSubmit} />

        <div className='overlay-containerlg'>
          <div className='overlaylg'>
            <div className='overlay-panellg overlay-leftlg'>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className='ghostlg' id='signInlg' onClick={ToogleClass}>
                Sign In
              </button>
            </div>
            <div className='overlay-panellg overlay-rightlg'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className='ghostlg' id='signUplg' onClick={ToogleClass}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAuth
