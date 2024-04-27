import React from 'react';
import './Footer.css';
import logo from  './logo.svg';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='footerExternal'>
      <div className='footerInternal'>
        <div className='footerInternal2'>
          <div className='footerInternal3'>
            <img src={logo} className='footerImage' alt='Not found'/>
            {/* <svg xmlns="http://www.w3.org/2000/svg" className='footerSVG' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg> */}
            <Link to={'/about'} className='link'>
              <h1 className='h1Link'>Contacto</h1>
            </Link>
            <Link to={'/about'} className='link'>
              <h1 className='h1Link'>About</h1>
            </Link>
          </div>
          <div className='footerdown'>
            <p className='footerdownP'>© 2024 Copyright: Ariadna Communications Group</p>
          </div>
        </div>
      </div>
    </div>
  )
}
