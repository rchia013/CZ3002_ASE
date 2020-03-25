import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { AppBar, Tabs, Tab, Paper} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import './Wasteitem copy.css'
import Navbar from '../../components/navbar/Navbar.js'
import plasticImg from '../../components/image/plastic.jpg'
import plasticbagImg from '../../components/image/plasticbag.jpg'
import shampooImg from '../../components/image/shampoo.jpg'
import masonjarImg from '../../components/image/masonjar.jpg'
import glassbottleImg from '../../components/image/glassbottles.jpg'
import batteriesImg from '../../components/image/batteries.jpg'
import phonesImg from '../../components/image/phone.jpg'
import computerImg from '../../components/image/computer.jpg'
import lightbulbImg from '../../components/image/light.jpg'
import florescenttubeImg from '../../components/image/florescenttube.jpg'
import fairylightsImg from '../../components/image/fairylights.jpg'
import Navbar2 from '../../components/navbar2/navbar2.js'
import plasticImg from '../GreenCart/Images/PlasticBottles.jpg'
import eWasteImg from '../GreenCart/Images/e-waste.jpg'
import glassImg from '../GreenCart/Images/glass.jpg'



class Wasteitem extends Component{

    // This is a state that holds the current values of variables we are interested in.
    // In this case, they are count for plastic bottles and batteries
    state = {points:0, tab: 0}

    componentDidMount(){
        this.setState(
            this.props.location.state
        )
    }
    
    // Handle Change to text fields
    // Honestly not entirely clear how this works, but I believe it's the handleChange('[input]')
    // which determines which fields are updated in props. Something like that :)    
    
    // Function for button removing cart item
    removeCartItem = event => {
        var buttonClicked = event.target
        var shopItem = buttonClicked.parentElement.parentElement
        var cartDetails = shopItem.getElementsByClassName('cart-item')[0]
        var title = cartDetails.getElementsByClassName('cart-item-title')[0].innerText
        // Handling state
        this.setState({[title]: 0})
        buttonClicked.parentElement.parentElement.remove()
        this.updateCartTotal()
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
            this.setState({[title]: quantity})
        
        }
        this.setState({points: total})
        document.getElementsByClassName('cart-total-points')[0].innerText = total + ' points'

        
    }
    
    /* ------------------------------------------------------------------------------------ */

    // For tabs
    handleChange = (event, newValue) => {
        this.setState({tab: newValue});
    }


  render(){
    console.log(this.state)

    
    
    return(
        <div>
            <Navbar2/>
            <div class="waste_item_content">
                <div class="waste_selection">
                    <div class="waste_items">
                    <AppBar position="static" color="auto">
                        <Tabs value={this.state.tab} onChange={this.handleChange} aria-label="simple tabs example">
                            {/* Add tabs here */}
                            <Tab label="Plastic"  />
                            <Tab label="E-Waste"  />
                            <Tab label="Glass" />
                            <Tab label="Lighting" />
                        </Tabs>
                    </AppBar>
                    {/* Hi Joey! Look here! */}
                    <div class="shop-items">
                        {/* Copy enclosed for tabs + content
                            If you are creating a new tab, remember to change the value. Current largest is 2
                            Look above for tab details
                            
                            For images, look at import plasticImg from '....' at the top as reference 
                            If you are changing details, adding stuff, just edit the innerHTMLs. The js portion
                            above handles the rest */}
                        {(this.state.tab == 0) ?
                        <Paper elevation={3} square className="shop-item-paper">
                        <div class="shop-item">
                            <span class="shop-item-title">Plastic Bottles</span>
                            <img class="shop-item-image" src={plasticImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">5 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Plastic Bag</span>
                            <img class="shop-item-image" src={plasticbagImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">5 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Shampoo Bottles</span>
                            <img class="shop-item-image" src={shampooImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">5 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        </Paper> : null}
                        {/* Copy up till here (end of enclosed area) */}
                        
                        {(this.state.tab == 1) ?
                        <Paper elevation={3} square className="shop-item-paper">
                        <div class="shop-item">
                            <span class="shop-item-title">Batteries</span>
                            <img class="shop-item-image" src={batteriesImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">5 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Phones</span>
                            <img class="shop-item-image" src={phonesImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">10 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Computer</span>
                            <img class="shop-item-image" src={computerImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">10 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        </Paper> : null}
                        
                        {(this.state.tab == 2) ?
                        <Paper elevation={3} square className="shop-item-paper">
                        <div class="shop-item">
                            <span class="shop-item-title">Mason Jar</span>
                            <img class="shop-item-image" src={masonjarImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">5 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Glass Bottles</span>
                            <img class="shop-item-image" src={glassbottleImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">5 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>

                        </Paper> : null}


                        {(this.state.tab == 3) ?
                        <Paper elevation={3} square className="shop-item-paper">
                        <div class="shop-item">
                            <span class="shop-item-title">Light Bulb</span>
                            <img class="shop-item-image" src={lightbulbImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">5 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Florescent Tubes</span>
                            <img class="shop-item-image" src={florescenttubeImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">5 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Fairy Lights</span>
                            <img class="shop-item-image" src={fairylightsImg} />
                            <div class="shop-item-details">
                                <span class="shop-item-points">5 points</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        </Paper> : null}
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

                {/* Conditional rendering for button */}
                {(this.state.points == 0) ?
                <Button 
                    className="btn-recycle"
                    disabled
                    variant="contained" color="auto" size="large">
                    RECYCLE
                </Button> :
                <Button 
                    className="btn-recycle"
                    variant="contained" color="auto" size="large" 
                    component={RouterLink} 
                    to={{
                        pathname:'/Confirmation', 
                        state: this.state
                    }}>
                    RECYCLE
                </Button>}
            </div>
            </div>

            </div>
        </div>
    );
    }
}

export default Wasteitem;
