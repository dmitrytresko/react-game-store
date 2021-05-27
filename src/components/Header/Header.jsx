import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from 'react-dropdown';
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import userIcon from "../../assets/img/user.png";
import cartIcon from "../../assets/img/shopping-cart.png";
import 'react-dropdown/style.css';
import "./styles.scss";

const Header = ({ authenticateUser }) => {
  const history = useHistory();
  const productsItems = ["All games", "PlayStation", "Xbox", "PC"];
  const [dropdownState, setDropdownState] = useState("Products");

  const [modalState, setModalState] = useState({ isOpened: false, signInClicked: false, regClicked: false });

  const isLogged = useSelector(state => state.user?.isLogged);
  const userLogin = useSelector(state => state.user?.userName);
  const userCartCount = useSelector(state => state.user?.cartCount);

  useEffect(() => {
    if (isLogged) {
      switch (dropdownState) {
        case "All games": return history.push("/products");
        case "PlayStation": return history.push("/products/ps");
        case "Xbox": return history.push("/products/xbox");
        case "PC": return history.push("/products/pc");
        default: return;
      }
    }

    return setDropdownState("Products");
  }, [dropdownState])

  const onLinkClickHandler = () => {
    setDropdownState("Products");
  }

  const onUserClickHandler = () => {
    onLinkClickHandler();
    history.push('/profile')
  }

  const changeDropdownHandler = event => setDropdownState(event.value);

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
      authenticateUser({
        isLogged: false,
        login: null,
        password: null,
        address: null,
        phone: null,
        cartCount: 0,
        selectedItems: []
      });

      history.push('/');
    }
  }

  const onCartClickHandler = () => {
    setDropdownState("Products");
    history.push('/cart');
  }

  return (
    <>
      <header className="header">
        <nav className="header__navbar">
          <NavLink to="/" exact className="header__link" activeClassName="header__link--active" onClick={onLinkClickHandler}>Home</NavLink>
          <Dropdown className="header__link"
                    options={productsItems}
                    value={dropdownState}
                    onChange={changeDropdownHandler} />
          <NavLink to="/about" className="header__link" activeClassName="header__link--active" onClick={onLinkClickHandler}>About</NavLink>
        </nav>

        <h1 className="header__title" onClick={() => history.push("/")}>Best Games Store</h1>

        <div className={`header__login-container ${!isLogged ? `narrow` : ''}`.trim()}>
          {!isLogged ? (
            <>
              <button className="header__link" type="button" onClick={onLogInClickHandler}>Sign In</button>
              <button className="header__link header__reg-btn" type="button" onClick={onRegClickHandler}>Registration</button>
            </>
          ) : (
            <>
              <button className="header__cart-btn" type="button" onClick={onCartClickHandler}>
                  <div className="header__cart-btn-counter">
                    <span className="header__cart-btn-counter--number">{userCartCount}</span>
                  </div>
                  <img className="header__cart-img" src={cartIcon} />
              </button>
              <div className="header__login-handler" onClick={onUserClickHandler}>
                <p className="header__link">{userLogin}</p>
                <img className="header__user-icon" src={userIcon}/>
              </div>
              <button className="header__link header__reg-btn" type="button" onClick={onLogOutClickHandler}>Log Out</button>
            </>
          )}
        </div>

        <div className="header__burger"></div>
      </header>

      <Modal opened={modalState.isOpened}
            type={`${modalState.signInClicked ? "signIn" : "registration"}`}
            confirmUserAuthentication={confirmUserAuthentication}
            onCloseClick={() => setModalState({ isOpened: false, signInClicked: false, regClicked: false })}>
              <InputText fieldLabel="Login:" fieldName="login" message="Enter your login here..."></InputText>
              <InputText fieldLabel="Password:" fieldName="password" message="Enter your password here..."></InputText>
              {modalState.regClicked ? (
                <InputText fieldLabel="Confirm password:" fieldName="confirmPassword" message="Repeat your password here..."></InputText>
              ) : ""}
      </Modal>
    </>
  )
}

export default Header;
