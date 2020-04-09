import React from "react";
import "./App.css";
import Home from "./pages/Home/Home.js";
import Wasteitems from "./pages/Wasteitem/Wasteitem copy.js";
import Confirmation from "./pages/Confirmation/Confirmation.js";
import Confirmation2 from "./pages/Confirmation/Confirmation2.js";
import History from "./pages/Confirmation/History.js";
import Onemap from "./pages/onemap/onemap2.js";
import Categorypage from "./pages/Categorypage/Categorypage.js";
import DemoApp from "./pages/calendar/calendar.jsx";
import Lightingcat from "./pages/Categorypage/Lightingcat.js";
import Test from "./pages/Categorypage/test.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Profile2 from "./pages/Login/Profile2.js";
import Admin from "./pages/admin/admin.js";
import Vouchers from "./pages/vouchers/vouchers.js";
import Adminorders from "./pages/admin/adminOrders.js";
import Adminschedule from "./pages/admin/adminSchedule";
import Adminitems from "./pages/admin/adminItemUpdate";
import RVouchers2 from "./pages/vouchers/redeemvouchers2.js";

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
          <Route path="/finalconfirmation" component={Confirmation2} />
          <Route path="/history" component={History} />
          <Route path="/onemap" component={Onemap} />
          <Route path="/lightingcat" component={Lightingcat} />
          <Route path="/test" component={Test} />
          <Route path="/calendar" component={DemoApp} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile2} />
          <Route path="/admin" component={Admin} />
          <Route path="/vouchers" component={Vouchers} />
          <Route path="/adminorders" exact component={Adminorders} />
          <Route path="/adminschedule" exact component={Adminschedule} />
          <Route path="/adminitems" exact component={Adminitems} />
          <Route path="/redeemvouchers" exact component={RVouchers2} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
