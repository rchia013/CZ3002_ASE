import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { AppBar, Tabs, Tab, Paper} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import './Wasteitem copy.css'
import fairylightsImg from '../../components/image/fairylights.jpg'
import Navbar2 from '../../components/navbar2/navbar2.js'
import { firebaseapp, base } from "../../base.js";



class Wasteitem extends Component{

    // This is a state that holds the current values of variables we are interested in.
    // In this case, they are count for plastic bottles and batteries
    state = {points:0, tab: 0}

    componentDidMount(){
        this.setState(
            this.props.location.state
        )
        this.setState({['Batteries Points']: 0,
                        ['Batteries Weight']: 0,
                        ['Computer Points']: 0,
                        ['Computer Weight']: 0,
                        ['Fairy Lights Points']: 0,
                        ['Fairy Lights Weight']: 0,
                        ['Florescent Tubes Points']: 0,
                        ['Florescent Tubes Weight']: 0,
                        ['Glass Bottles Points']: 0,
                        ['Glass Bottles Weight']: 0,
                        ['Light Bulb Points']: 0,
                        ['Light Bulb Weight']: 0,
                        ['Mason Jar Points']: 0,
                        ['Mason Jar Weight']: 0,
                        ['Phones Points']: 0,
                        ['Phones Weight']: 0,
                        ['Plastic Bag Points']: 0,
                        ['Plastic Bag Weight']: 0,
                        ['Plastic Bottles Points']: 0,
                        ['Plastic Bottles Weight']: 0,
                        ['Shampoo Bottles Points']: 0,
                        ['Shampoo Bottles Weight']: 0})

        this.getItems()
    }
    
    getItems() {
        base.fetch("items/", {
          context: this,
          then(data) {
            this.setState({ ['Batteries Points']: data['Batteries Points'],
                            ['Batteries Weight']: data['Batteries Weight'],
                            ['Computer Points']: data['Computer Points'],
                            ['Computer Weight']: data['Computer Weight'],
                            ['Fairy Lights Points']: data['Fairy Lights Points'],
                            ['Fairy Lights Weight']: data['Fairy Lights Weight'],
                            ['Florescent Tubes Points']: data['Florescent Tubes Points'],
                            ['Florescent Tubes Weight']: data['Florescent Tubes Weight'],
                            ['Glass Bottles Points']: data['Glass Bottles Points'],
                            ['Glass Bottles Weight']: data['Glass Bottles Weight'],
                            ['Light Bulb Points']: data['Light Bulb Points'],
                            ['Light Bulb Weight']: data['Light Bulb Weight'],
                            ['Mason Jar Points']: data['Mason Jar Points'],
                            ['Mason Jar Weight']: data['Mason Jar Weight'],
                            ['Phones Points']: data['Phones Points'],
                            ['Phones Weight']: data['Phones Weight'],
                            ['Plastic Bag Points']: data['Plastic Bag Points'],
                            ['Plastic Bag Weight']: data['Plastic Bag Weight'],
                            ['Plastic Bottles Points']: data['Plastic Bottles Points'],
                            ['Plastic Bottles Weight']: data['Plastic Bottles Weight'],
                            ['Shampoo Bottles Points']: data['Shampoo Bottles Points'],
                            ['Shampoo Bottles Weight']: data['Shampoo Bottles Weight'] });
          }
        })
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
        var weight = shopItem.getElementsByClassName('shop-item-weight')[0].innerText
        var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
        this.addItemToCart(title, points, weight, imageSrc)
        this.updateCartTotal()
    }
    
    // Called by above function
    addItemToCart(title, points, weight, imageSrc){
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
        <span class="cart-weight cart-column">${weight}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div> `
        
        

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
        var totalpoints = 0
        var totalweight = 0

        for(var i=0; i<cartRows.length; i++){
            var cartRow = cartRows[i]
            var cartDetails =cartRow.getElementsByClassName('cart-item')[0]
            var title = cartDetails.getElementsByClassName('cart-item-title')[0].innerText
            var pointElement =cartRow.getElementsByClassName('cart-points')[0]
            var weightElement =cartRow.getElementsByClassName('cart-weight')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            //var points = parseInteger(pointElement.innerText.replace('points',''))
            var weight = parseInt(weightElement.innerText.replace('weight',''))
            var points = parseInt(pointElement.innerText.replace('points',''))
            var quantity = quantityElement.value
            totalpoints = totalpoints + (points*quantity)
            totalweight = totalweight + (weight*quantity)

            // Handling state (points only)
            this.setState({[title]: quantity})
            // this.setState({[title]: weight})

        
        }
        this.setState({points: totalpoints})
        this.setState({weight: totalweight})
        document.getElementsByClassName('cart-total-points')[0].innerText = totalpoints + ' points'
        document.getElementsByClassName('cart-total-weight')[0].innerText = totalweight + ' kg'

        
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
                        <Tabs variant = "fullWidth" value={this.state.tab} onChange={this.handleChange} aria-label="simple tabs example">
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
                            <div class="shop-items">
                        <div class="shop-item">
                            <span class="shop-item-title">Plastic Bottles</span>
                            <img class="shop-item-image" src="/plastic-bottle.png" />
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Plastic Bottles Points']} points</span>
                                <span class="shop-item-weight">{this.state['Plastic Bottles Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Plastic Bag</span>
                            <img class="shop-item-image" src="/plastic-bag.png" />
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Plastic Bag Points']} points</span>
                                <span class="shop-item-weight">{this.state['Plastic Bag Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Shampoo Bottles</span>
                            <img class="shop-item-image" src="/shampoo-bottle.png" />
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Shampoo Bottles Points']} points</span>
                                <span class="shop-item-weight">{this.state['Shampoo Bottles Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        </div>
                        </Paper> : null}
                        {/* Copy up till here (end of enclosed area) */}
                        
                        {(this.state.tab == 1) ?
                        <Paper elevation={3} square className="shop-item-paper">
                            <div class="shop-items">
                        <div class="shop-item">
                            <span class="shop-item-title">Batteries</span>
                            <img class="shop-item-image" src="/battery.png" />
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Batteries Points']} points</span>
                                <span class="shop-item-weight">{this.state['Batteries Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Phones</span>
                            <img class="shop-item-image" src="mobile-phone.png" />
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Phones Points']} points</span>
                                <span class="shop-item-weight">{this.state['Phones Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Computer</span>
                            <img class="shop-item-image" src= "/laptop.png"/>
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Computer Points']} points</span>
                                <span class="shop-item-weight">{this.state['Computer Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        </div>
                        </Paper> : null}
                        
                        {(this.state.tab == 2) ?
                        <Paper elevation={3} square className="shop-item-paper">
                            <div class="shop-items">
                        <div class="shop-item">
                            <span class="shop-item-title">Mason Jar</span>
                            <img class="shop-item-image" src="mason-jar.png" />
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Mason Jar Points']} points</span>
                                <span class="shop-item-weight">{this.state['Mason Jar Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Glass Bottles</span>
                            <img class="shop-item-image" src="/glass-bottle.png" />
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Glass Bottles Points']} points</span>
                                <span class="shop-item-weight">{this.state['Glass Bottles Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        </div>                                
                        </Paper> : null}


                        {(this.state.tab == 3) ?
                        <Paper elevation={3} square className="shop-item-paper">
                            <div class="shop-items">
                        <div class="shop-item">
                            <span class="shop-item-title">Light Bulb</span>
                            <img class="shop-item-image" src="/lightbulb.png" />
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Light Bulb Points']} points</span>
                                <span class="shop-item-weight">{this.state['Light Bulb Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Florescent Tubes</span>
                            <img class="shop-item-image" src="Florescent-lamp.png" />
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Florescent Tubes Points']} points</span>
                                <span class="shop-item-weight">{this.state['Florescent Tubes Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        <div class="shop-item">
                            <span class="shop-item-title">Fairy Lights</span>
                            <img class="shop-item-image" src="/fairy-lights.png" />
                            <div class="shop-item-details">
                                <span class="shop-item-points">{this.state['Fairy Lights Points']} points</span>
                                <span class="shop-item-weight">{this.state['Fairy Lights Weight']} kg</span>
                                <button class="btn btn-primary shop-item-button" type="button" onClick={this.addToCartClicked}>ADD TO CART</button>
                            </div>
                        </div>
                        </div>
                        </Paper> : null}
                    </div>
                </div>


                

            <div class="greencart" style = {{border: '4px solid grey'}}>
                <h2 class="section-header">GREEN CART</h2>
                <div class="cart-row">
                    <span class="cart-item cart-header cart-column">ITEM</span>
                    <span class="cart-points cart-header cart-column">POINTS</span>
                    <span class="cart-weight cart-header cart-column">WEIGHT</span>
                    <span class="cart-quantity cart-header cart-column">QUANTITY</span>
                    
                </div>
                <div class="cart-items" />
                <div class="cart-total">
                    <strong class="cart-total-title">Total Points:</strong>
                    <span class="cart-total-points">0 points</span>
                    <strong class="divider">|</strong>
                    <strong class="cart-total-title">Total Weight:</strong>
                    <span class="cart-total-weight">0 kg</span>
                </div>

                {/* Conditional rendering for button */}
                {((this.state.points == 0) || ((this.state.weight<10)&&(this.state.selfrecycle==false))) ?
                <Button 
                    className="btn-recycle-disabled"
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
