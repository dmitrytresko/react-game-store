/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductsPg from "./components/ProductsPg";
import AboutPg from "./components/AboutPg";
import HomePg from "./components/HomePg";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>

        <Switch>
          <Route path="/products" component={ProductsPg} />
          <Route path="/about" component={AboutPg} />
          <Route path="/" exact component={HomePg} />
        </Switch>

        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
