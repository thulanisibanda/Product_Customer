import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductsComponent from "./components/ProductsComponent";
import ProductEdit from "./components/ProductEdit";
import CustomerEdit from "./components/CustomerEdit";
import CustomersComponent from "./components/CustomersComponent";
import { CustomerContext } from "./Context/CustomerContext";

const App = () => {
  const [customer, setCustomer] = useState([]);

  return (
    <Router>
      <Switch>
        <CustomerContext.Provider value={{ customer, setCustomer }}>
          <Route path="/" exact={true} component={Home} />
          <Route path="/products" exact={true} component={ProductsComponent} />
          <Route
            path="/customers"
            exact={true}
            component={CustomersComponent}
          />
          <Route path="/products/:id" component={ProductEdit} />
          <Route path="/customers/:id" component={CustomerEdit} />
        </CustomerContext.Provider>
      </Switch>
    </Router>
  );
};

export default App;
