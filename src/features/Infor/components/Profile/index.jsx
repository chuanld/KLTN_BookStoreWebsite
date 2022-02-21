import React, { useState } from 'react'
import dateFormat from 'dateformat'
import { AccountCircle, PermIdentity, Settings } from '@mui/icons-material'

import { useSelector } from 'react-redux'


function Profile() {
  const user = useSelector((state) => state.user.current)
  console.log(user)

  
  

  const isLogged = user.isLogged

  const [userInf, setUserInf] = useState({
    name: '',
    address: '',
    phone: '',
    password: '',
    newPassword: '',
    confirmNewpass: '',
  })
  const { name, address, phone, password, newPassword, confirmNewpass } =
    userInf
  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUserInf({ ...user, [name]: value })
  }

  const updateInfo = (e) => {
    e.prevenDefault()
    //code
  }

  const updatePassword = (e) => {
    e.prevenDefault()
    //code
  }

  return (
    <>
      {isLogged ? (
        <div className='user'>
          <div className='userTitleContainer'>
            <h1 className='userTitle'>
              <Settings className='userTitleIcon' />
              My Profile
            </h1>
          </div>
          <div className='userContainer'>
            <div className='userShow'>
              <div className='userShowTop'>
                <AccountCircle className='userShowImg' />
                <div className='userShowTopTitle'>
                  <span className='userShowUsername'>{user.email}</span>
                  <span className='userShowUserTitle'>{user.name}</span>
                </div>
              </div>
              <div className='userShowBottom'>
                <span className='userShowTitle'>Account Detail</span>
                <div className='userShowInfo'>
                  <PermIdentity className='userShowIcon' />
                  <span className='userShowInfoTitle'>Name: {user.name}</span>
                </div>
                <div className='userShowInfo'>
                  <PermIdentity className='userShowIcon' />
                  <span className='userShowInfoTitle'>Phone: {user.phone}</span>
                </div>
                <div className='userShowInfo'>
                  <PermIdentity className='userShowIcon' />
                  <span className='userShowInfoTitle'>
                    Address: {user.address}
                  </span>
                </div>
                <div className='userShowInfo'>
                  <PermIdentity className='userShowIcon' />
                  <span className='userShowInfoTitle'>
                    Role: {user.role === 0 ? 'User Account' : 'Admin Account'}
                  </span>
                </div>
                <div className='userShowInfo'>
                  <PermIdentity className='userShowIcon' />
                  <span className='userShowInfoTitle'>
                    Date join: {dateFormat(user.createdAt)}
                  </span>
                </div>
                <div className='userShowInfo'>
                  <PermIdentity className='userShowIcon' />
                  <span className='userShowInfoTitle'>
                    Last update: {dateFormat(user.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className='userUpdate'>
              <span className='userUpdateTitle'>Edit Information</span>
              <div className='userUpdateContainer'>
                <div className='userUpdateLeft'>
                  <form className='userUpdateInfo' onSubmit={updateInfo}>
                    <div className='userUpdateItem'>
                      <label>Name</label>
                      <input
                        type='text'
                        name='name'
                        placeholder={userInf.name}
                        value={user.name}
                        className='userUpdateInput'
                        onChange={onChangeInput}
                      />
                    </div>
                    <div className='userUpdateItem'>
                      <label>Phone</label>
                      <input
                        type='text'
                        name='phone'
                        value={userInf.phone}
                        placeholder={user.phone}
                        className='userUpdateInput'
                        onChange={onChangeInput}
                      />
                    </div>
                    <div className='userUpdateItem'>
                      <label>Address</label>
                      <input
                        type='text'
                        name='address'
                        value={userInf.address}
                        placeholder={user.address}
                        className='userUpdateInput'
                        onChange={onChangeInput}
                      />
                    </div>

                    <button className='userUpdateButton' type='submit'>
                      Update Info
                    </button>
                  </form>
                </div>
                <div className='userUpdateRigh'>
                  <form className='userUpdatePass' onSubmit={updatePassword}>
                    <div className='userUpdateItem'>
                      <label>Password</label>
                      <input
                        type='password'
                        className='userUpdateInput'
                        placeholder='Password'
                        name='password'
                        value={userInf.password}
                        onChange={onChangeInput}
                      />
                    </div>
                    <div className='userUpdateItem'>
                      <label>New Password</label>
                      <input
                        type='password'
                        placeholder='New pass word if you want'
                        className='userUpdateInput'
                        name='newPassword'
                        value={userInf.newPassword}
                        onChange={onChangeInput}
                      />
                    </div>
                    <div className='userUpdateItem'>
                      <label>Confirm New Password</label>
                      <input
                        type='password'
                        placeholder='Confirm new password'
                        className='userUpdateInput'
                        name='confirmNewpass'
                        value={userInf.confirmNewpass}
                        onChange={onChangeInput}
                      />
                    </div>
                    <div className='row'>
                      <button
                        className='userUpdateButton update-password-btn'
                        type='submit'
                      >
                        Update Pass
                      </button>
                      <span className='warning'>
                        * If you change password. <br />
                        Login the next time you will remember
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>You must login to access!</h1>
      )}
    </>
  )
}

export default Profile
