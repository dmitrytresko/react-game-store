import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUserData } from "./redux/actions";
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
    this.props.setUserDataFunc(userData);
    this.setState({ user: userData, hasError: false });
  }

  render() {
    return (
      <Router>
        {this.state.hasError && <Redirect to="/" />}

        <Header authenticateUser={this.authenticateUser} />

        <Switch>
          <Route path="/" exact component={HomePg} />
          <ProtectedRoute path="/products" component={ProductsPg} />
          <ProtectedRoute path="/about" exact component={AboutPg} />
          <ProtectedRoute path="/profile" exact component={ProfilePg} />
          <Route component={NotFoundPg}></Route>
        </Switch>

        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.user,
})

const mapDispatchToProps = dispatch => ({
  setUserDataFunc: (data) => dispatch(setUserData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
