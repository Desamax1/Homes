import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
        <ul>
            <li>
                <Link className='link' to="/">Home</Link>
            </li>
        </ul>
    </nav>
  );
}

export default Navbar;