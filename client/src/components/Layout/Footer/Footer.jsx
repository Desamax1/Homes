import React from 'react';
import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="tint"></div>
      <div className="wrapper">
        <div className="row">
          <div className="col">
              <h3>Find your dream home</h3>
              <Link className='link' to="/">Apartments</Link>
              <Link className='link' to="/">Condos</Link>
              <Link className='link' to="/">Houses</Link>
              <Link className='link' to="/">Offices</Link>
          </div>
          <div className="line"></div>
          <div className="col">
              <h3>Social media</h3>
              <a href="/" className="link"><FiInstagram />Instagram</a>
              <a href="/" className="link"><FiFacebook />Facebook</a>
              <a href="/" className="link"><FiLinkedin />LinkedIn</a>
              <a href="/" className="link"><FiTwitter />Twitter</a>
          </div>
          <div className="line"></div>
          <div className="col">
              <h3>Account management</h3>
              <Link className="link" to="/login">Log in</Link>
              <Link className="link" to="/register">Register</Link>
              <Link className="link" to="/list">List property</Link>
              <Link className="link" to="/my-profile">View your profile</Link>
          </div>
        </div>
        <div className="row">
          <h3 className='copyright'>&copy; 2023 Despot Maksimovic</h3>
        </div>
      </div>
    </footer>
  );
}

export default Footer;