import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import './Layout.css';

function Layout() {
  return (
    <div className='Container'>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout