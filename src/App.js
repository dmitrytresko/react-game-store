import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUserData } from "./redux/actions";

const Header = lazy(() => import("./components/Header/Header"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const HomePg = lazy(() => import("./pages/HomePg/HomePg"));
const ProductsPg = lazy(() => import("./pages/ProductsPg/ProductsPg"));
const AboutPg = lazy(() => import("./pages/AboutPg/AboutPg"));
const ProfilePg = lazy(() => import("./pages/ProfilePg/ProfilePg"));
const NotFoundPg = lazy(() => import("./pages/NotFoundPg/NotFoundPg"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

import loader from "./assets/img/loader.gif"
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
        <Suspense fallback={<img src={loader} style={{display: 'block', margin: 'auto', width: '50px'}}/>} >
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
        </Suspense>
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
