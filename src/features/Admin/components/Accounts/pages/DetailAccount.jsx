import React, { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import userApi from 'api/userApi'
import { AccountCircle, PermIdentity, Settings } from '@mui/icons-material'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import adminApi from 'api/adminApi'
import FormDataAccount from '../components/FormDataAccount'
import withLoading from 'components/HOC/withLoading'
import Breadcrumb from 'components/Breadcrumbs'

function DetailAccount({ showLoading, hideLoading }) {
  const params = useParams()
  const [detailUser, setDetailUser] = useState([])
  const [callback, setCallback] = useState(false)
  const getAccountById = async () => {
    try {
      showLoading()
      const res = await adminApi.getInfoById(params.id)
      setDetailUser(res)
    } catch (err) {}
    hideLoading()
  }
  useEffect(() => {
    getAccountById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, callback])

  const updateAccount = async (values) => {
    try {
      const res = await adminApi.updateAccounts(params.id, values)
      toast.success(res.msg)
      setCallback(!callback)
    } catch (err) {
      toast.error(err.response.msg)
    }
  }
  return (
    <>
      <div className='session-heading'>
        <Breadcrumb />
      </div>
      <div className='user'>
        <div className='userTitleContainer'>
          <h1 className='userTitle'>
            <Settings className='userTitleIcon' />
            Edit User
          </h1>
          <Link to='/admin/accounts'>
            <button className='userAddButton'>Back</button>
          </Link>
        </div>
        <div className='userContainer'>
          <div className='userShow'>
            <div className='userShowTop'>
              <AccountCircle className='userShowImg' />
              <div className='userShowTopTitle'>
                <span className='userShowUsername'>{detailUser.name}</span>
                <span className='userShowUserTitle'>{detailUser.email}</span>
              </div>
            </div>
            <div className='userShowBottom'>
              <span className='userShowTitle'>Account Detail</span>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span className='userShowInfoTitle'>
                  Name: {detailUser.name}
                </span>
              </div>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span className='userShowInfoTitle'>
                  Phone: {detailUser.phone}
                </span>
              </div>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span className='userShowInfoTitle'>
                  Address: {detailUser.address}
                </span>
              </div>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span className='userShowInfoTitle'>
                  Role:{' '}
                  {detailUser.role === 0 ? 'User Account' : 'Admin Account'}
                </span>
              </div>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span className='userShowInfoTitle'>
                  Date join: {dateFormat(detailUser.createdAt)}
                </span>
              </div>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span className='userShowInfoTitle'>
                  Last update: {dateFormat(detailUser.updatedAt)}
                </span>
              </div>
            </div>
          </div>
          <div className='userUpdate'>
            <span className='userUpdateTitle'>Edit Information</span>
            <FormDataAccount account={detailUser} onSubmit={updateAccount} />
          </div>
        </div>
      </div>
    </>
  )
}

export default withLoading(DetailAccount)
