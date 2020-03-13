import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import './Plasticcat.css';
import Category from '../../components/category/Category.js'
import Navbar from '../../components/navbar/Navbar.js'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


class Ewastecat extends Component {
    render() {
  
      const cats = [
        {
          name: "Computers",
          pic: "computer"
          //uniqueID:"1"
        },

        {
          name: "Mobile phones",
          pic: "phone"
          //uniqueID:"1"
        },

        {
          name: "Battery",
          pic: "batteries"
          //uniqueID:"1"
        },
      ];

      return(
        <div className="wholecat">
          <div className="catname">
            <h2>Ewaste</h2>
            <div className="catlist" >
            {cats.map(cat => {
              return (
                <div className="try" key ={cat.name}>
                  <Category              
                  name = {cat.name}
                  pic={cat.pic}
                />

                </div>

              );
            })}
          </div>
          </div>

        </div>
            

      );
    }
  }

  export default Ewastecat;
