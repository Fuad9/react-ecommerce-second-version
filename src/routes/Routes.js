import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../components/pages/Home/Home";
import ProductDetails from "../components/pages/ProductDetails/ProductDetails";
import Review from "../components/pages/Review/Review";

const Routes = () => {
   return (
      <div>
         <Router>
            <Switch>
               <Route exact path="/" component={Home} />

               <Route path="/product/:productKey">
                  <ProductDetails />
               </Route>

               <Route path="/review" component={Review} />
            </Switch>
         </Router>
      </div>
   );
};

export default Routes;
