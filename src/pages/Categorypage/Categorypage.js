import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import './Categorypage.css';
import Categorypage2 from './Categorypage.html';
import Navbar from '../../components/navbar/Navbar.js'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
var htmlDoc = {__html: Categorypage2};
var dict = [];

class Categorypage extends Component {

  constructor(props){
    super(props);
//    this.htmlDoc = require(props.template)
}
render(){
    return(
        <div className="Categorypage">
            <Navbar/>
            <div dangerouslySetInnerHTML = {htmlDoc} />
            {/* <button onclick="goToGreenCart()">Click me</button> */}
            <Grid container justify = "center">
              <Button 
                  variant="contained" color="green" size="large" onClick={goToGreenCart}
                  component={RouterLink} to="/greenshoppingcart">
                      Go To Green Car
                      
              </Button>
            </Grid>



        </div>

            
    );
}
  // render() {
  //   return(
  //     <div className="categories">
  //       <Navbar/>
  //       <section id="Title">Select waste category</section>
  //       <div className="cats">
  //         <Plasticcat/>
  //         <Glasscat/>
  //         <Ewastecat/>
  //         <Lightingcat/>
  //         {/* <Test padding= {100}/> */}
  //       </div>
        
  //     </div>
  //   );


  // }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
} else{
  ready()
}

function ready(){
  var addToCartButtons = document.getElementsByClassName('cat-item-button')
  for(var i=0; i<addToCartButtons.length; i++){
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

  var el = document.getElementsByClassName('btn-goGreenCart')[0];
  if(el){
      el.addEventListener('click',goToGreenCart);
  }
}

function addToCartClicked(event){
  var button = event.target
  var catItem = button.parentElement.parentElement
  var title = catItem.getElementsByClassName('cat-item-title')[0].innerText
  var points = catItem.getElementsByClassName('cat-item-points')[0].innerText
  var imageSrc = catItem.getElementsByClassName('cat-item-image')[0].src
  alert("adding stuff")
  checkIfAdded(title, points, imageSrc)
}


function checkIfAdded(title, points, imageSrc){
  alert("before for loop")
  if(isEmpty(dict)) {
    addItemToDict(title, points, imageSrc)
  } else {
    for(var key in dict){
      alert("in for loop")
      //var val = dict[key]
      if(key == title) {
          alert('This item is already added to the cart')
          return 
      }
      else{
        addItemToDict(title, points, imageSrc)
      }
    }
  }
}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

function addItemToDict(title, points, imageSrc){
  dict[title] = []
  dict[title].push(points)
  dict[title].push(imageSrc)
  // dict.push({
  //   // key:   title,
  //   // value: points, imageSrc
  //   title: points, imageSrc
  // })
  alert("added")
  alert("title is")
  alert(title)
  for(var title in dict){
    alert("key in cat is")
    alert(title)
  }

}

function goToGreenCart(){

  localStorage.setItem( 'objectToPass', JSON.stringify(dict) );
  console.log(dict);
  alert("crossed")
  if (localStorage.hasOwnProperty('objectToPass')){
    alert("has ")
  }
  else{
    alert("no")
  }

  if (dict==null){
    alert("dict is null ")
  }
  else{
    alert("no dict not nulls")
  }

} 


export default Categorypage;