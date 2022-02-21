import React from 'react'
import Banner from './components/banners/Banner'
import Intro from './components/intro/Intro'
import About from './components/about/About'
import Footer from '../../components/Footer/index'

function Home() {
  return (
    <div>
      <Banner />
      <Intro />
      <About />
      <Footer />
    </div>
  )
}

export default Home
