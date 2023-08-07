import React from 'react'
import'./Navbar.css'
import logo from '../images/bank.jpg.png'
const Navbar = () => {
  return (
    <div className='dash'>
      <h1>COMPENSATION REQUEST PORTAL</h1>
      <img src={logo} alt="img" />
    </div>
  )
}

export default Navbar
