import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import './Wasteitem copy.css'
import Navbar from '../../components/navbar/Navbar.js'
import plasticImg from '../GreenCart/Images/PlasticBottles.jpg'
import eWasteImg from '../GreenCart/Images/e-waste.jpg'
import glassImg from '../GreenCart/Images/glass.jpg'



class Wasteitem extends Component{

    // This is a state that holds the current values of variables we are interested in.
    // In this case, they are count for plastic bottles and batteries
    state = {points:0}
    
    // Handle Change to text fields
    // Honestly not entirely clear how this works, but I believe it's the handleChange('[input]')
    // which determines which fields are updated in props. Something like that :)
    
    handleSubmitandClose = input => e => {
        console.log(input)
        if (this.state.updating_qty==null){
            this.setState({dialog: false});
        } else{
            var new_qty = this.state.updating_qty
            this.setState({plastic_dialog: false, ewaste_dialog: false, glass_dialog: false, [input]: new_qty, updating_qty: null})
        }
    }

    componentDidMount(){
        this.ready();
    }


    /* ------------------------------------------------------------------------------------ */
    ready(){
        // Button for removing item from cart
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for(var i =0; i<removeCartItemButtons.length; i++){
            var button = removeCartItemButtons[i]
            button.addEventListener('click', this.removeCartItem)
        }
    
        // Textfield for cart item qty
        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for( var i =0; i<quantityInputs.length; i++){
            var input = quantityInputs[i]
            input.addEventListener('change', this.quantityChanged)
        }
        
        // Button for adding to cart (waste selection)
        var addToCartButtons = document.getElementsByClassName('shop-item-button')
        for(var i=0; i<addToCartButtons.length; i++){
            var button = addToCartButtons[i]
            button.addEventListener('click', this.addToCartClicked)
        }
    
        // Essentially submit button
        var el = document.getElementsByClassName('btn-recycle')[0];
        if(el){
            el.addEventListener('click', this.recycleClicked);
        }
    }
    
    // Function for recycling -- need to change
    // recycleClicked = event => {
    //     alert("Thank you for recycling")
    //     var cartItems = document.getElementsByClassName('cart-items')[0]
    //     while(cartItems.hasChildNodes){
    //         cartItems.removeChild(cartItems.firstChild)
    //     }
    //     this.updateCartTotal()
    // } 
    
    // Function for button removing cart item
    removeCartItem = event => {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        this.updateCartTotal()

        // Handling state
        // var shopItem = button.parentElement.parentElement
        // var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
        // this.setState({[title]: 0})

    }
    
    // Function for textfield
    quantityChanged = event => {
        var input = event.target
        if(isNaN(input.value) || input.value <= 0){
            input.value = 1
        }

        this.updateCartTotal()
    }
    
    // Function for add to cart button
    addToCartClicked = event => {
        var button = event.target
        var shopItem = button.parentElement.parentElement
        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
        var points = shopItem.getElementsByClassName('shop-item-points')[0].innerText
        var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
        this.addItemToCart(title, points, imageSrc)
        this.updateCartTotal()
    }
    
    // Called by above function
    addItemToCart(title, points, imageSrc){
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row') //add into the cart horizontally
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        for(var i=0; i<cartItemNames.length;i++){
            if(cartItemNames[i].innerText == title) {
                alert('This item is already added to the cart')
                return 
            }
        }
    
        // Adding to display under green cart
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
        cartItems.append(cartRow)
        //code below is used to make the new remove btn and quantity button works. The original remove and qty btn is already loaded when the page started but not the new buttons
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', this.removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', this.quantityChanged)

        // Handling state
        this.setState({[title]: 1})
    }
    
    // Called by textfield function
    updateCartTotal(){
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0
        for(var i=0; i<cartRows.length; i++){
            var cartRow = cartRows[i]
            var cartDetails =cartRow.getElementsByClassName('cart-item')[0]
            var title = cartDetails.getElementsByClassName('cart-item-title')[0].innerText
            var pointElement =cartRow.getElementsByClassName('cart-points')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            //var points = parseInteger(pointElement.innerText.replace('points',''))
            var points = parseInt(pointElement.innerText.replace('points',''))
            var quantity = quantityElement.value
            total = total + (points*quantity)

            // Handling state (points only)
            this.setState({points: total, [title]: quantity})
        
        }
        document.getElementsByClassName('cart-total-points')[0].innerText = total + ' points'

        
    }
    
    /* ------------------------------------------------------------------------------------ */

  render(){
    console.log(this.state)
    
    return(
        <div>
            <Navbar/>
            <div class="waste_item_content">
            

            <div class="waste_selection">
                <div class="waste_items">
                <h2 class="section-header">Recyclables</h2>
                <div class="shop-items">
                    <div class="shop-item">
                        <span class="shop-item-title">Plastic</span>
                        <img class="shop-item-image" src={plasticImg} />
                        <div class="shop-item-details">
                            <span class="shop-item-points">5 points</span>
                            <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                        </div>
                    </div>
                    <div class="shop-item">
                        <span class="shop-item-title">Batteries</span>
                        <img class="shop-item-image" src={eWasteImg} />
                        <div class="shop-item-details">
                            <span class="shop-item-points">5 points</span>
                            <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                        </div>
                    </div>
                
                    <div class="shop-item">
                        <span class="shop-item-title">Glass</span>
                        <img class="shop-item-image" src={glassImg} />
                        <div class="shop-item-details">
                            <span class="shop-item-points">5 points</span>
                            <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                        </div>
                    </div>

                    <div class="shop-item">
                        <span class="shop-item-title">E Waste</span>
                        <img class="shop-item-image" src={eWasteImg} />
                        <div class="shop-item-details">
                            <span class="shop-item-points">10 points</span>
                            <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="greencart">
                <h2 class="section-header">GREEN CART</h2>
                <div class="cart-row">
                    <span class="cart-item cart-header cart-column">ITEM</span>
                    <span class="cart-points cart-header cart-column">POINTS</span>
                    <span class="cart-quantity cart-header cart-column">QUANTITY</span>
                </div>
                <div class="cart-items" />
                <div class="cart-total">
                    <strong class="cart-total-title">Total</strong>
                    <span class="cart-total-points">0 points</span>
                </div>
                <Button 
                    className="btn-recycle"
                    variant="contained" color="auto" size="large" 
                    component={RouterLink} 
                    to={{
                        pathname:'/Confirmation', 
                        state: this.state
                    }}>
                    RECYCLE
                </Button>
            </div>

            </div>

            </div>
        </div>
    );
    }
}

export default Wasteitem;
