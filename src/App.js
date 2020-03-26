import React from "react";
import "./App.css";
import Home from "./pages/Home/Home.js";
import Wasteitems from "./pages/Wasteitem/Wasteitem copy.js";
import Confirmation from "./pages/Confirmation.js";
import History from "./pages/History.js";
import GoogleMapPage from "./googlemaps/googlemaps.js";
import Onemap from "./onemap/onemap2.js";
import Categorypage from "./pages/Categorypage/Categorypage.js";
import DemoApp from "./pages/calendar/calendar.jsx";
//import Plasticcat from "./pages/Categorypage/Plasticcat.js";
import Lightingcat from "./pages/Categorypage/Lightingcat.js";
import Test from "./pages/Categorypage/test.js";
import Category from "./components/category/Category.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GreenShoppingCart from "./pages/GreenCart/GreenShoppingCart.js";
import Login from "./pages/Login/Login.js";
import Profile from "./pages/Login/Profile.js";
import Profile2 from "./pages/Login/Profile2.js";
import Admin from "./pages/admin/admin.js";
import Vouchers from "./pages/vouchers/vouchers.js";
import Adminorders from "./pages/admin/adminOrders.js"
import Adminschedule from "./pages/admin/adminSchedule"
import RVouchers from "./pages/vouchers/redeemvouchers.js";

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
          <Route path="/" exact component={Home} />
          <Route path="/categorypage" component={Categorypage} />
          <Route path="/waste-items" component={Wasteitems} />
          <Route path="/confirmation" component={Confirmation} />

          {/* There is currently no link/button to History. You can access it manually by
                typing '/history' to the end of 'localhost:3000'. I have only ever worked with 
                API calls to MySQL (not even sure if it counts as API) but I used a secondary router
                for that. Just keep in mind for when you try to link to data.gov API, may have to use
                another router. */}
          <Route path="/history" component={History} />
          <Route path="/map" component={GoogleMapPage} />
          <Route path="/onemap" component={Onemap} />
          <Route path="/lightingcat" component={Lightingcat} />
          <Route path="/test" component={Test} />
          <Route path="/greenshoppingcart" component={GreenShoppingCart} />
          <Route path="/calendar" component={DemoApp} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile2} />
          <Route path="/admin" component={Admin} />
          <Route path="/vouchers" component={Vouchers} />
          <Route path="/adminorders" exact component={Adminorders} />
          <Route path="/adminschedule" exact component={Adminschedule} />
          <Route path="/redeemvouchers" exact component={RVouchers} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
