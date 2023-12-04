import React from 'react'
import { Header } from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import LiveProvider from '../../components/liveProvider/LiveProvider'
import './Home.css'

export const Home = ({children}) => {
  return (
    <>
    <Header />
    <div className='home-container'>
        {children}
        <LiveProvider />
    </div>
    <Footer />
    </>
  )
}
