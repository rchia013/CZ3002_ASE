
import React, { Component } from 'react';
import "../navbar/Navbar.css";
import { Link as RouterLink } from 'react-router-dom';
import Home from '../../pages/Home/Home.js';
import { firebaseapp } from '../../base.js'
     


class Navbar2 extends Component {

  state = {user: null, loading: true}

  componentDidMount(){
    firebaseapp.auth().onAuthStateChanged((user) => {
      if (user!=null) {
          this.setState({ user: user, loading: false });
      } else {
          this.setState({ user: null, loading: false });
      }
    });
  }

  checkStatus() {
    firebaseapp.auth().onAuthStateChanged((user) => {
            if (user!=null) {
                this.setState({ user: user });
                this.getUserDetails()
            } else {
                this.setState({ user: null });
      }
    });

}

  render() {

    return (
            <div class="navbar">
                {/* Bar that appears at the top */}
                {/* Apparently using #home jumps to that section on the page based on Section id */}
                {(this.state.loading==true) ? null : 
                <ul>
                    <li><RouterLink to =  "/">Home</RouterLink></li>
                    {(this.state.user==null) ? 
                    <li><RouterLink to={{ pathname:'/login', state: {selfrecycle: true}}}> Self-Recycle </RouterLink></li>:
                    <li><RouterLink to={{ pathname:'/onemap', state: {selfrecycle: true}}}> Self-Recycle </RouterLink></li>}
                    {/* <li><RouterLink to = '/waste-items'>Schedule Pick-Up</RouterLink></li> */}

                    {(this.state.user==null) ?
                    <li><RouterLink to={{ pathname:'/login', state: {selfrecycle: false}}}>Schedule Pick-Up</RouterLink></li>:
                    <li><RouterLink to={{ pathname:'/waste-items', state: {selfrecycle: false}}}>Schedule Pick-Up</RouterLink></li>}
                    <li><RouterLink to = "/profile">My Account</RouterLink></li>
                </ul>
                }
            </div>
    );

  }

}

export default Navbar2;