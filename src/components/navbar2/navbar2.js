
import React, { Component } from 'react';
import "../navbar/Navbar.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../../pages/Home/Home.js'
     


class Navbar2 extends Component {
  render() {

    return (
            <div class="navbar">
                {/* Bar that appears at the top */}
                <nav class="navbar">
                <img style={{maxHeight: '60px', maxWidth: '90px'}}src = "/logo.jpg"/>
                    {/* Apparently using #home jumps to that section on the page based on Section id */}
                    <ul>
                        <li><Link to = "/">Home</Link></li>
                        <li><Link> Self-Recycle </Link></li>
                        <li><Link>Schedule Pick-Up</Link></li>
                        <li><Link>My Account</Link></li>
                    </ul>
                </nav>
            </div>
    );

  }

}

export default Navbar2;