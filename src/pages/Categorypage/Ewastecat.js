import React, { Component } from 'react';
import './Plasticcat.css';
import Category from '../../components/category/Category.js'



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
