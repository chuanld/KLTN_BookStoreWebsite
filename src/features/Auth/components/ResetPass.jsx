import userApi from 'api/userApi'
import { StorageKeys } from 'constant/storageKey'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

function ResetPass() {
  const { token } = useParams()
  const [data, setdata] = useState({
    password: '',
    confirm: '',
  })
  const { password } = data
  const onChangeInput = (e) => {
    const { name, value } = e.target
    setdata({ ...data, [name]: value })
  }
  useEffect(() => {
    if (token) {
      localStorage.setItem(StorageKeys.TOKEN, token)
    }
  }, [token])
  const resetSubmit = async (e) => {
    e.preventDefault()
    if (data.password.length < 6)
      return alert('Password must be at least 6 character')
    if (data.password !== data.confirm)
      return alert('Password and confirm does not match!')
    try {
      const result = await userApi.resetPassword(password)
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="forgot-page">
      <div className="formfg-container">
        <form className="formfg" onSubmit={resetSubmit}>
          <h1>Forgot Account</h1>
          <div className="social-containerlg">
            <Link to="#" className="sociallg"></Link>
            <Link to="#" className="sociallg"></Link>
            <Link to="#" className="sociallg"></Link>
            <p>Following email belong to re-send password</p>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={data.password}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            required
            value={data.confirm}
            onChange={onChangeInput}
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPass
