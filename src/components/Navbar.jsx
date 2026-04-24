// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MyBrand</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>    
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/form">Get Started</Link></li>
        <li style={{ background: 'linear-gradient(135deg, #ff00ff, #68c8e6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          <Link to="/aisakura">Ask AI Sakura</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
