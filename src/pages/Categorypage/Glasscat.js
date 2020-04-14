import React, { Component } from 'react';
import './Plasticcat.css';
import Category from '../../components/category/Category.js'



class Glasscat extends Component {
    render() {
  
      const cats = [
        {
          name: "Glass bottle",
          pic: "glass"
          //uniqueID:"1"
        }
      ];

      return(
        <div className="wholecat">
          <div className="catname">
            <h2>Glassadd</h2>
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

  export default Glasscat;
