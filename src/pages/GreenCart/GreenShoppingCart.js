import React, { Component } from 'react';
import GreenShoppingCart2 from './GreenShoppingCart.html';
import { Link as RouterLink} from 'react-router-dom';
import './GreenCart.css'
import './GreenShoppingCart.html'
import Navbar from '../../components/navbar/Navbar.js'
var htmlDoc = {__html: GreenShoppingCart2};

class GreenShoppingCart extends Component{
    constructor(props){
        super(props);
        retrieveLocalStorage()

    //    this.htmlDoc = require(props.template)
    }
    render(){
        return(
            <div className="GreenCart">
                <Navbar/>
                <div dangerouslySetInnerHTML = {htmlDoc} />
            </div>
                
        );
    }

}

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for(var i =0; i<removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for( var i =0; i<quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i=0; i<addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    var el = document.getElementsByClassName('btn-recycle')[0];
    if(el){
        el.addEventListener('click',recycleClicked);
    }

    
}

function retrieveLocalStorage(){

    var myData = JSON.parse(localStorage.getItem('objectToPass'));
    // if (localStorage.hasOwnProperty('objectToPass')){
    // alert("hass in gc")
    // }
    // else{
    // alert("no in gc")
    // }
    
    if (myData != null){
        console.log(myData)
        alert("my data not null")
        alert(myData)
        var allData = myData[0];

        if(allData == null){
            alert("allData is null")
        }
        else{
            alert("alldata not null")
        }
        console.log(allData);

        for(var key of allData){
            alert("key iis")
            alert(key)
            var title = key;
            var points = allData[key][0]; 
            var img = allData[key][1];
            addItemToCart(title, points, img);
        }
    }
    window.localStorage.removeItem('objectToPass'); // Clear the localStorage

}

function recycleClicked(event){
    alert("Thank you for recycling")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    
} 


function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var points = shopItem.getElementsByClassName('shop-item-points')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, points, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, points, imageSrc){
    alert(title)
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row') //add into the cart horizontally
    var cartItems = document.getElementsByClassName('cart-items')[0]
    if (cartItems == null){
        alert("cart itmem nulll")
    }
    else{
        alert("cart item not nullll")
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        for(var i=0; i<cartItemNames.length;i++){
            if(cartItemNames[i].innerText == title) {
                alert('This item is already added to the cart')
                return 
            }
        }
    }

    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-points cart-column">${points}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents //adding the whole html format into the cart
    if (cartItems == null){
        cartItems = cartRow
        alert("cart item=catrt row")
    }
    else{
        cartItems.append(cartRow)
    }
    
    //code below is used to make the new remove btn and quantity button works. The original remove and qty btn is already loaded when the page started but not the new buttons
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i=0; i<cartRows.length; i++){
        var cartRow = cartRows[i]
        var pointElement =cartRow.getElementsByClassName('cart-points')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        //var points = parseInteger(pointElement.innerText.replace('points',''))
        var points = parseInt(pointElement.innerText.replace('points',''))
        var quantity = quantityElement.value
        total = total + (points*quantity)
    
    }
    document.getElementsByClassName('cart-total-points')[0].innerText = total + ' points'
}

export default GreenShoppingCart;
