import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import './Category.css';


class Category extends Component {
    render() {
      return ( 

          <div className="polaroid">
            <img src={require("../../components/image/" + this.props.pic + ".jpg")} height="250" width="150"/>
            <div className="container">
              
              <p>{this.props.name}</p>
              <IconButton color="primary">
                <AddShoppingCartIcon />
              </IconButton>
            </div>
          </div>

      );
    }
  }


export default Category;