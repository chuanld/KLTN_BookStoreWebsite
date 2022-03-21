import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import productApi from 'api/productApi'
import { Banner4 } from '../../template/assets/images/index'
import {
  SubBanner1,
  SubBanner2,
  SubBanner3,
  SubBanner4,
  SubBanner6,
  SubBanner01,
  SubBanner02,
} from '../../template/assets/images/index'

import('./styles.css')
const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
}
function BannerSlide() {
  const [bannerList, setBannerList] = useState([])
  const [loading, setLoading] = useState(true)
  const isLoaded = useRef(false)
  const [ref, inView] = useInView({
    threshold: 0,
  })
  const SubBannerArr1 = [SubBanner1, SubBanner2]
  const SubBannerArr2 = [
    SubBanner3,
    SubBanner4,
    SubBanner6,
    SubBanner01,
    SubBanner02,
  ]

  const getListBanners = async () => {
    setLoading(true)
    try {
      const res = await productApi.getListBanners()
      setBannerList(res.banners)
      setLoading(false)
    } catch (error) {
      // console.log(error);
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!isLoaded.current && inView) {
      getListBanners()
      isLoaded.current = true
    }
  }, [inView])

  return (
    <>
      <section className='banner-slide'>
        <div className='banner-slide-container'>
          <div className='subbanner-heading'>
            <div ref={ref}>
              <Slider className='slider' {...settings}>
                <div className='slider__item'>
                  <img src={Banner4} alt='' />
                </div>
                {bannerList.map((item) => (
                  <div key={item?.banner_id} className='slider__item'>
                    <img src={item?.images?.url} alt='' />
                  </div>
                ))}
              </Slider>
            </div>
            <div className='subbanner-container'>
              {SubBannerArr1.map((item) => (
                <div className='sub-banner' key={item.banner_id}>
                  <img src={item} alt='' width={240} />
                </div>
              ))}
            </div>
          </div>
          <div className='subbanner-footer'>
            {SubBannerArr2.map((item) => (
              <div className='sub-bannerft' key={item.banner_id}>
                <img src={item} alt='' />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default BannerSlide
