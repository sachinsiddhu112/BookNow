import React from 'react'
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleLogin = () => {
    navigate("/login");
  }
  
  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <img src="./booking.png" alt="" />
          <span className='logo'>BookNow</span>
        </Link>
        {user ? user.username : <div className='navItems'>
          <button className="navButton" onClick={handleLogin}>
            Register
          </button>
          <button onClick={handleLogin} className="navButton">Login</button>
        </div>}
      </div>
    </div>
  )
}
