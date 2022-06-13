import { unwrapResult } from '@reduxjs/toolkit'
import { dispatch } from 'app/store'
import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { activateEmail } from '../userSlice'

function Activation() {
  const { activationtoken } = useParams()
  const history = useHistory()
  // const state = useContext(GlobalState);
  // const [givenName] = state.userApi.givenName;
  // const [callback, setCallback] = state.callback;
  useEffect(() => {
    if (activationtoken) {
      console.log(activationtoken, 'activationtoken')
      const activationEmail = async () => {
        // const res = await axios.post("/user/activation", { activationtoken });

        // localStorage.setItem("firstLogin", true);
        // localStorage.setItem("token", res.data.accesstoken);
        // setCallback(!callback);
        // history.push("/");
        // toast.success(`Hello ${givenName}.`);
        const action = activateEmail(activationtoken)
        const resultAction = await dispatch(action)
        const res = unwrapResult(resultAction)
        console.log(res)
        if (res.status !== 0) {
          toast.success('Đăng kí thành công!')
          return
        }
        toast.error(res.data)
      }
      activationEmail()
    }
    // eslint-disable-next-line
  }, [activationtoken])

  return <div className='active_page'></div>
}

export default Activation
