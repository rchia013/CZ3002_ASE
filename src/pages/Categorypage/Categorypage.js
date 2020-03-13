import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import './Categorypage.css';
import Navbar from '../../components/navbar/Navbar.js'
import Plasticcat from './Plasticcat.js';
import Glasscat from './Glasscat.js';
import Ewastecat from './Ewastecat.js';
import Lightingcat from './Lightingcat.js';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

import Test from './test.js';

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