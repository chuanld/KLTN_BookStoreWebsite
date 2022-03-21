import React from 'react'
import { AddCircle } from '@mui/icons-material'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FormCreateAccount from '../components/FormCreateAccount'
import adminApi from 'api/adminApi'
import Breadcrumb from 'components/Breadcrumbs'

function CreateAccount() {
  const handleSubmit = async (values) => {
    try {
      const res = await adminApi.createAccount(values)
      toast.success(res.msg)
    } catch (err) {
      toast.error(err.response.msg)
    }
    console.log(values, 'cretae account')
  }
  return (
    <>
      <div className='session-heading'>
        <Breadcrumb />
      </div>
      <div className='createUser'>
        <h1 className='createUserTitle'>
          <AddCircle className='createUserIcon' />
          Create Account
        </h1>
        <div className='createUserForm'>
          <FormCreateAccount onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}

export default CreateAccount
