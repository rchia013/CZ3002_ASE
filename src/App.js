import React from 'react';
import './App.css';
import Home from './components/Home.js'
import Wasteitems from './components/Wasteitem.js'
import Confirmation from './components/Confirmation.js'
import History from './components/History.js'
import GoogleMapPage from './googlemaps/googlemaps.js'
import Onemap from './onemap/onemap.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


// This is a functional component. If you need additional functionaility, it can be changed to a 
// class based component. As of now, its just a glorified routing thing so not necessary.
// If you look at index.js, <App /> is called there which basicallly renders this on the screen.
// In this version, I did not use this method to render stuff on the screen, though it is possible.
// You can pass in Props when you call components using the <App /> method too if I'm not mistaken.

function App() {
  return (
    <Router>
      <div>
          <Switch>
            {/* Exact used for home path because if you don't everything directs there */}
            <Route path="/" exact component={Home}/>
            <Route path="/waste-items" component={Wasteitems}/>
            <Route path="/confirmation" component={Confirmation}/>
            {/* joey testing 123 */}
            {/* sebastian 2nd test */}

            {/* There is currently no link/button to History. You can access it manually by
                typing '/history' to the end of 'localhost:3000'. I have only ever worked with 
                API calls to MySQL (not even sure if it counts as API) but I used a secondary router
                for that. Just keep in mind for when you try to link to data.gov API, may have to use
                another router. */}
            <Route path="/history" component={History}/>
            <Route path="/map" component={GoogleMapPage}/>
            <Route path="/onemap" component={Onemap}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
