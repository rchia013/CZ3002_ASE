import React, { Component } from 'react';
import './Plasticcat.css';
import Category from '../../components/category/Category.js'


class Plasticcat extends Component {
    render() {
  
      const cats = [
        {
          name: "Plastic bottle",
          pic: "plastic"
          //uniqueID:"1"
        },
  
        {
          name: "Plastic bags",
          pic: 'plasticbag'
          //uniqueID:"2"
        },
        {
          name: "Shampoo bottle",
          pic: 'shampoo'
          //uniqueID:"3"
        }
      ];

      return(
        <div className="wholecat">
          <div className="catname">
            <h2>Plastics</h2>
          </div>
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
            

      );
    }
  }

  export default Plasticcat;