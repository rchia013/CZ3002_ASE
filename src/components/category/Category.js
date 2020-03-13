import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import './Category.css';


class Category extends Component {
    render() {
      return ( 

          <div className="polaroid">
            <img src={require("../../components/image/" + this.props.pic + ".jpg")}/>
            <div className="container">
              
              <p>{this.props.name}</p>
              {/* <Button size="small" variant="outlined" color="primary">
                Add to GreenCart
              </Button> */}
              <IconButton color="primary">
                <AddShoppingCartIcon />
              </IconButton>
            </div>
          </div>




        // <div
        //   className="category"
        //   onClick={() => this.props.onClick(this.props.name)}
        // >

        //   <img
        //     src={plastic}
        //     alt="Plastic"
        //   />
  
        //   <div className="chat-tab-details">
        //     <h4>{this.props.name}</h4>
        //     <p>{this.props.latestMessage}</p>
        //   </div>
  
        // </div>
      );
    }
  }


export default Category;