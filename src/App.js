import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePg from "./pages/HomePg/HomePg";
import ProductsPg from "./pages/ProductsPg/ProductsPg";
import AboutPg from "./pages/AboutPg/AboutPg";
import NotFoundPg from "./pages/NotFoundPg/NotFoundPg";
import './styles/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <Redirect to="/" />;
    }

    return (
      <Router>
        <Header />

        <Switch>
          <Route path="/" exact component={HomePg} />
          <Route path="/products" component={ProductsPg} />
          <Route path="/about" component={AboutPg} />
          <Route component={NotFoundPg}></Route>
        </Switch>

        <Footer />
    </Router>
    );
  }
}

export default App;
