import React from 'react'
import { Header } from '../header/Header'
import Footer from '../footer/Footer'

export const Leyout = ({children}) => {
  return (
    <>
    <Header />
    <>{children}</>
    <Footer />
    </>
  )
}
