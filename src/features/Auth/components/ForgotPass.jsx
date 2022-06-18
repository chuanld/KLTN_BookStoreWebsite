import userApi from 'api/userApi'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './forgotPass.css'

function ForgotPass() {
  const [data, setData] = useState({
    email: '',
  })
  const onChangeInput = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const forgotSubmit = async (e) => {
    e.preventDefault()
    try {
      if (data.email) {
        const result = await userApi.forgotPassword(data)
        console.log(result)
      } else {
        console.log('Type Email for re-send password')
      }
    } catch (err) {
      console.log(err.response)
    }
  }
  return (
    <div className="forgot-page">
      <div className="formfg-container">
        <form className="formfg" onSubmit={forgotSubmit}>
          <h1>Forgot Account</h1>
          <div className="social-containerlg">
            <Link to="#" className="sociallg"></Link>
            <Link to="#" className="sociallg"></Link>
            <Link to="#" className="sociallg"></Link>
            <p>Following email belong to re-send password</p>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={data.email}
            onChange={onChangeInput}
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPass
