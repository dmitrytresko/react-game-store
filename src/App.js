/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1 className="header__title">Best Games Market</h1>
          <nav className="header__navigation">
            <Link to="/" className="header__link">Home</Link>
            <Link to="/products" className="header__link">Products</Link>
            <Link to="/about" className="header__link">About</Link>
          </nav>
        </header>

        <Switch>
        <Route path="/products">
          <h2 className="page-title">Products page</h2>
        </Route>
        <Route path="/about">
          <h2 className="page-title">About page</h2>
        </Route>
        <Route path="/" exact>
        <h2 className="page-title">Home page</h2>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
