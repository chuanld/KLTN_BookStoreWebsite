import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import SideBar from './components/Sidebar'
import Profile from './components/Profile'
import Order from './components/Order'
import OrderDetail from './components/Order/OrderDetail'

function Infor() {
  return (
    <>
      <Router>
        <div className='container_infor'>
          <SideBar />
          <div className='page_infor'>
            <Switch>
              <Route path='/infor' exact component={Profile} />
              <Route path='/order' exact component={Order} />
              <Route path='/order/:id' exact component={OrderDetail} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  )
}

export default Infor
