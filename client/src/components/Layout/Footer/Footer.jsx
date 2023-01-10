import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
        <div className="col">
            <h3>First column</h3>
            <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="line"></div>
        <div className="col">
            <h3>Second column</h3>
            <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="line"></div>
        <div className="col">
            <h3>Third column</h3>
            <p>Lorem ipsum dolor sit amet.</p>
        </div>
    </footer>
  );
}

export default Footer;