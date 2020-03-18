
import React, { Component } from 'react';
import "./Navbar.css";



class Navbar extends Component {
  
  render() {

    return (
        <div class="navbar">
            {/* Bar that appears at the top */}
            <nav class="navbar">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#plastic">Plastic</a></li>
                    <li><a href="#ewaste">E-Waste</a></li>
                    <li><a href="#letsgo">Let's Go</a></li>
                    <li><a href="#profile_details">Profile Details</a></li>
                </ul>
            </nav>
        </div>

    );

  }

}

export default Navbar;