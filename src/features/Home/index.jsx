import React from 'react'
import Banner from './components/banners/Banner'
import Intro from './components/intro/Intro'
import About from './components/about/About'
import Footer from '../../components/Footer/index'
import Breadcrumb from 'components/Breadcrumbs'
import BannerSlide from 'components/BannerSlide'

function Home() {
  return (
    <div>
      {/* <Banner /> */}

      <BannerSlide />
      <Breadcrumb />
      <Intro />
      <About />
      <Footer />
    </div>
  )
}

export default Home
