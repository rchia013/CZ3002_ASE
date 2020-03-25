
import React, { Component } from 'react';
import "../navbar/Navbar.css";
import { Link as RouterLink } from 'react-router-dom';
import Home from '../../pages/Home/Home.js';
     


class Navbar2 extends Component {
  render() {

    return (
            <div class="navbar">
                {/* Bar that appears at the top */}
                {/* Apparently using #home jumps to that section on the page based on Section id */}
                <ul>
                    <li><RouterLink to =  "/">Home</RouterLink></li>
                    <li><RouterLink to={{ pathname:'/onemap', state: {selfrecycle: true}}}> Self-Recycle </RouterLink></li>
                    {/* <li><RouterLink to = '/waste-items'>Schedule Pick-Up</RouterLink></li> */}
                    <li><RouterLink to={{ pathname:'/waste-items', state: {selfrecycle: false}}}>Schedule Pick-Up</RouterLink></li>
                    <li><RouterLink to = "/profile">My Account</RouterLink></li>
                </ul>
            </div>
    );

  }

}

export default Navbar2;