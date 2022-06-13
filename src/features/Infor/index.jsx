import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import SideBar from './components/Sidebar'
import Profile from './components/Profile'
import Order from './components/Order'
import OrderDetail from './components/Order/OrderDetail'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import Breadcrumb from 'components/Breadcrumbs'
import Activation from 'features/Auth/components/Activation'

function Infor() {
  const { path } = useRouteMatch()
  const user = useSelector((state) => state.user.current)
  return (
    <>
      {/* {user ? ( */}
      <Router>
        <div className='container_infor'>
          {user && <SideBar />}
          <div className='page_infor'>
            <div className='session-heading'>{user && <Breadcrumb />}</div>

            <Switch>
              <Route
                path={`${path}/activate/:activationtoken`}
                exact
                component={Activation}
              />
              {user && (
                <Route path={`${path}/infor`} exact component={Profile} />
              )}
              {user && <Route path={`${path}/order`} exact component={Order} />}
              {user && (
                <Route
                  path={`${path}/order/:id`}
                  exact
                  component={OrderDetail}
                />
              )}
            </Switch>
          </div>
        </div>
      </Router>
      {/* ) : (
        <Redirect to='/' />
      )} */}
    </>
  )
}

export default Infor
