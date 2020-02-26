import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import './Home.css'

// This is a class based component (forgot what it's proper name is called). The other option is
// a functional component. Class based components offer more flexibility though.

class Home extends Component{

    // Functions/Methods, if any, go here. See other pages for example

  render(){

    // Functions to be run should be put here. And other stuff that I'm probably not aware of.
    // Note that ComponentWillMount() etc will be above in the function area (see Wasteitem.js)
    // These special functions will, generally speaking, run before anything is loaded

    // Return is basically the html for whatever you want displayed. 
    // Note that you can only return one html element, so in this case i wrapped everything in 
    // <div class="home_content">

    return(
        <div class="home_content">

            {/* Bar that appears at the top */}
            <nav class="navbar">
                {/* Apparently using #home jumps to that section on the page based on Section id */}
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#plastic">Plastic</a></li>
                    <li><a href="#ewaste">E-Waste</a></li>
                    <li><a href="#letsgo">Let's Go</a></li>
                </ul>
            </nav>

            {/* These are the sections that appear on the page. Smooth scrolling is implemented in CSS
                because everything else is too advanced for me. Removing CSS would just make it a
                normal webpage */}
            <section id="home">
                <h1>Welcome!</h1>
                <p>This is our webapp!</p>
            </section>

            <section id="plastic">
                <h1>Plastic</h1>
                <p>Recycle used bottles and containers!</p>
            </section>

            <section id="ewaste">
                <h1>E-waste</h1>
                <p>Recycle batteries and used computers!</p>
            </section>

            <section id="letsgo">
                <Button 
                    variant="contained" color="primary" size="large" 
                    component={RouterLink} to="/waste-items">
                        Let's Go!
                </Button>
                <br/>
                <Button 
                    variant="contained" color="primary" size="large" 
                    component={RouterLink} to="/map">
                        View Google Map
                </Button>
                <br/>
                <Button 
                    variant="contained" color="primary" size="large" 
                    component={RouterLink} to="/onemap">
                        View Onemap
                </Button>
            </section>
        </div>
    );
    }
}

// Remember to export so that you can use this component elsewhere
export default Home;
