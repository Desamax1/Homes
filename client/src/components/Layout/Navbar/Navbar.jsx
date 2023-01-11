import React from 'react';
import { Link } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import "./Navbar.css";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  return (
    <nav>
      <section>
        <Link className='link' to="/rent">Rent</Link>
        <Link className='link' to="/buy">Buy</Link>
        <Link className='link' to="/post">Post</Link>
      </section>
      <section>
        <Link className='link' to="/">
          <img src={logo} alt="logo" className='logo' />
        </Link>
      </section>
      <section className='account-area'>
        <Link className='link' to="/my-profile">
          <RiAccountCircleFill />
          My profile
        </Link>
      </section>
    </nav>
  );
}

export default Navbar;