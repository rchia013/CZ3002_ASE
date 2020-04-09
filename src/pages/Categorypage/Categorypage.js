import React, { Component } from 'react';
import './Categorypage.css';
import Navbar from '../../components/navbar/Navbar.js'
import Plasticcat from './Plasticcat.js';
import Glasscat from './Glasscat.js';
import Ewastecat from './Ewastecat.js';
import Lightingcat from './Lightingcat.js';


class Categorypage extends Component {
  render() {
    return(
      <div className="categories">
        <Navbar/>
        <section id="Title">Select waste category</section>
        <div className="cats">
          <Plasticcat/>
          <Glasscat/>
          <Ewastecat/>
          <Lightingcat/>
          {/* <Test padding= {100}/> */}
        </div>
        
      </div>
    );


  }
}

export default Categorypage;