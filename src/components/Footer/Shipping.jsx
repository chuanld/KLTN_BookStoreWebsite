import React from 'react'
import { LocalShipping, Payment } from '@mui/icons-material'
import { PublishedWithChanges } from '@mui/icons-material'

export default function Shipping() {
  return (
    <div className='shipping_area'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-6'>
            <div className='single_shipping'>
              <div className='shipping_icone'>
                <LocalShipping className='icone' />
              </div>
              <div className='shipping_content'>
                <h3>Free Delivery</h3>
                <p>
                  Free shipping around the world for all <br />
                  orders over $120
                </p>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6'>
            <div className='single_shipping col_2'>
              <div className='shipping_icone'>
                <Payment className='icone' />
              </div>
              <div className='shipping_content'>
                <h3>Safe Payment</h3>
                <p>Don't worry with our payment gateway safely</p>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6'>
            <div className='single_shipping col_3'>
              <div className='shipping_icone'>
                <PublishedWithChanges className='icone' />
              </div>
              <div className='shipping_content'>
                <h3>Friendly Services</h3>
                <p>
                  You have 30-day return guarantee for <br />
                  every single order
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
