import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePg from "./pages/HomePg/HomePg";
import ProductsPg from "./pages/ProductsPg/ProductsPg";
import AboutPg from "./pages/AboutPg/AboutPg";
import ProfilePg from "./pages/ProfilePg/ProfilePg";
import NotFoundPg from "./pages/NotFoundPg/NotFoundPg";
import ProtectedRoute from "./components/ProtectedRoute";
import './styles/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, hasError: false };
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  authenticateUser(userData) {
    localStorage.setItem("loggedUser", JSON.stringify(userData));
    this.setState({ user: userData, hasError: false });
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("loggedUser"));

    if (userData) {
      this.setState({ user: userData, hasError: false });
      console.log(`User ${userData.login} is authoruized`);
    }
  }

  render() {
    console.log(this.state.user);

    return (
      <Router>
        {this.state.hasError && <Redirect to="/" />}

        <Header authenticateUser={this.authenticateUser} userLogin={this.state.user?.login} />

        <Switch>
            <Route path="/" exact component={HomePg} />
            <ProtectedRoute path="/products" component={ProductsPg} userLogin={this.state.user?.login}/>
            <ProtectedRoute path="/about" exact component={AboutPg} userLogin={this.state.user?.login}/>
            <ProtectedRoute path="/profile" exact component={ProfilePg} userLogin={this.state.user?.login}/>
            <Route component={NotFoundPg}></Route>
        </Switch>

        <Footer />
      </Router>
    );
  }
}

export default App;
