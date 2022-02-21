import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function index() {
  return (
    <SkeletonTheme color='#ddd' highlightColor='#fff'>
      <div className='product_card'>
        <Skeleton width={252} height={250} />
        <div className='product_box'>
          <Skeleton width={252} height={25} />
          <Skeleton width={100} height={20} />
          <Skeleton width={150} height={15} />
          <Skeleton width={252} height={15} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default index
