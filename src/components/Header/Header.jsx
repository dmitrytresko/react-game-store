import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from 'react-dropdown';
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import userIcon from "../../assets/img/user.png";
import AuthContext from "../AuthContext";
import logger from "../../redux/actions";
import 'react-dropdown/style.css';
import "./styles.scss";

const Header = ({ authenticateUser }) => {
  const history = useHistory();
  const productsItems = ["PlayStation", "Xbox", "PC"];
  const [dropdownState, setDropdownState] = useState("Products");

  const [modalState, setModalState] = useState({ isOpened: false, signInClicked: false, regClicked: false });

  const isLogged = useSelector(state => state.isLogged.toString());
  const dispatch = useDispatch();

  useEffect(() => {
    switch (dropdownState) {
      case "PlayStation": return history.push("/products/ps");
      case "Xbox": return history.push("/products/xbox");
      case "PC": return history.push("/products/pc");
      default: return;
    }
  }, [dropdownState])

  const onLinkClickHandler = () => {
    setDropdownState("Products");
    dispatch(logger());
  }

  const onLogInClickHandler = () => {
    setModalState({ isOpened: true, signInClicked: true, regClicked: false });
  }

  const onRegClickHandler = () => {
    setModalState({ isOpened: true, signInClicked: false, regClicked: true });
  }

  const confirmUserAuthentication = (userData) => {
    authenticateUser(userData);
    setModalState({ isOpened: false, signInClicked: false, regClicked: false });

    history.push('/profile');
  }

  const onLogOutClickHandler = () => {
    const isConfirmed = confirm("Are sure that you want to log out?");

    if (isConfirmed) {
      authenticateUser(null);
      history.push('/');
    }
  }

  return (
    <AuthContext.Consumer>
      {value => (
        <>
          <header className="header">
            <nav className="header__navbar">
              <NavLink to="/" exact className="header__link" activeClassName="header__link--active" onClick={onLinkClickHandler}>Home</NavLink>
              <Dropdown className="header__link"
                      options={productsItems}
                      value={dropdownState}
                      onChange={event => {
                        setDropdownState(event.value);
                      }} />
              <NavLink to="/about" className="header__link" activeClassName="header__link--active" onClick={onLinkClickHandler}>About</NavLink>
            </nav>

            <h1 className="header__title" onClick={() => history.push("/")}>Best Games Store {isLogged}</h1>

            <div className="header__login-container">
              {!value ? (
                <>
                  <button className="header__link" type="button" onClick={onLogInClickHandler}>Sign In</button>
                  <button className="header__link header__reg-btn" type="button" onClick={onRegClickHandler}>Registration</button>
                </>
              ) : (
                <>
                  <div className="header__login-handler">
                  <p className="header__link" onClick={() => history.push('/profile')}>{value}</p>
                    <img className="header__user-icon" src={userIcon} onClick={() => history.push('/profile')} />
                  </div>
                  <button className="header__link header__reg-btn" type="button" onClick={onLogOutClickHandler}>Log Out</button>
                </>
              )}
            </div>

            <div className="header__burger"></div>
          </header>

          <Modal opened={modalState.isOpened}
                type={`${modalState.signInClicked ? "Sign In" : "Registration"}`}
                confirmUserAuthentication={confirmUserAuthentication}
                onCloseClick={() => setModalState({ isOpened: false, signInClicked: false, regClicked: false })}>
                  <InputText fieldLabel="Login:" fieldName="login" message="Enter your login here..."></InputText>
                  <InputText fieldLabel="Password:" fieldName="password" message="Enter your password here..."></InputText>
                  {modalState.regClicked ? (
                    <InputText fieldLabel="Password:" fieldName="confirmPassword" message="Repeat your password here..."></InputText>
                  ) : ""}
          </Modal>
        </>
      )}
    </AuthContext.Consumer>
  )
}

export default Header;
