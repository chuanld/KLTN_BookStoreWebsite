import Breadcrumb from 'components/Breadcrumbs'
import React, { useMemo } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { useLocation, Link } from 'react-router-dom'
import Discount from './components/Discount/index'
import FlashSale from './components/FlashSale'
import VoucherCode from './components/VoucherCode'

function Events() {
  const location = useLocation()
  const history = useHistory()
  const objParams = useMemo(() => {
    const arrParams = location.pathname.split('/')
    console.log(location.pathname)
    return { ...arrParams }
  }, [location.pathname])

  return (
    <>
      <Router>
        <div className='session-heading'>
          <Breadcrumb />
        </div>
        <div className='events'>
          <div className='events-navbar'>
            <div
              className={
                objParams[2] === 'events-fsale'
                  ? 'events-title active'
                  : 'events-title'
              }
              onClick={() => history.push('/admin/events-fsale')}
            >
              {/* <Link to='/admin/events/fsale'>Flash sale</Link> */}Flash
            </div>

            <div
              className={
                objParams[2] === 'events-disc'
                  ? 'events-title active'
                  : 'events-title'
              }
              onClick={() => history.push('/admin/events-disc')}
            >
              Discount
            </div>

            <div
              className={
                objParams[2] === 'events-procode'
                  ? 'events-title active'
                  : 'events-title'
              }
              onClick={() => history.push('/admin/events-procode')}
            >
              Promotion Code
            </div>
          </div>
          <div className='event-content'>
            {/* <Switch>
              <Route path='/admin/events/disc' exact component={Discount} />
              <Route path='/admin/events/fsale' exact component={FlashSale} />
            </Switch> */}

            {objParams[2] === 'events-fsale' && <FlashSale />}
            {objParams[2] === 'events-disc' && <Discount />}
            {objParams[2] === 'events-procode' && <VoucherCode />}
          </div>
        </div>
      </Router>
    </>
  )
}

export default Events
