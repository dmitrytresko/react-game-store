import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePg from "./pages/HomePg/HomePg";
import ProductsPg from "./pages/ProductsPg/ProductsPg";
import AboutPg from "./pages/AboutPg/AboutPg";
import NotFoundPg from "./pages/NotFoundPg/NotFoundPg";
import './styles/App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/" exact component={HomePg} />
          <Route path="/products" component={ProductsPg} />
          <Route path="/about" component={AboutPg} />
          <Route component={NotFoundPg}></Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
