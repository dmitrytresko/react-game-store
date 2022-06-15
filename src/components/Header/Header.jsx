import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "react-dropdown";
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import logoOutlined from "../../assets/img/don-logo-outlined.png";
import userIcon from "../../assets/img/user.jpg";
import cartIcon from "../../assets/img/shopping-cart.jpg";
import "react-dropdown/style.css";
import "./styles.scss";

const Header = ({ authenticateUser }) => {
  const history = useHistory();
  const productsItems = ["All games", "PlayStation", "Xbox", "PC"];
  const [dropdownState, setDropdownState] = useState("Products");

  const [modalState, setModalState] = useState({
    isOpened: false,
    signInClicked: false,
    regClicked: false,
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState({
    confirmLogOut: false,
  });

  const isLogged = useSelector((state) => state.user?.isLogged);
  const userLogin = useSelector((state) => state.user?.userName);
  const userCartCount = useSelector((state) => state.user?.cartCount);

  useEffect(() => {
    if (isLogged) {
      switch (dropdownState) {
        case "All games":
          return history.push("/products");
        case "PlayStation":
          return history.push("/products/ps");
        case "Xbox":
          return history.push("/products/xbox");
        case "PC":
          return history.push("/products/pc");
        default:
          return;
      }
    }

    return setDropdownState("Products");
  }, [dropdownState]);

  const onLinkClickHandler = () => {
    setDropdownState("Products");
  };

  const onHomeClickHandler = () => {
    onLinkClickHandler();
    history.push("/");
  };

  const onCartClickHandler = () => {
    setDropdownState("Products");
    history.push("/cart");
  };

  const onUserClickHandler = () => {
    onLinkClickHandler();
    history.push("/profile");
  };

  const changeDropdownHandler = (event) => setDropdownState(event.value);

  const confirmUserAuthentication = (userData) => {
    authenticateUser(userData);
    setModalState({ isOpened: false, signInClicked: false, regClicked: false });

    localStorage.setItem("user", JSON.stringify({ ...userData }));

    history.push("/profile");
  };

  const onLogInClickHandler = () => {
    setModalState({ isOpened: true, signInClicked: true, regClicked: false });
  };

  const onRegClickHandler = () => {
    setModalState({ isOpened: true, signInClicked: false, regClicked: true });
  };

  const logOutHandler = () => {
    authenticateUser({
      isLogged: false,
      login: "",
      password: "",
      isAdmin: false,
      address: null,
      phone: null,
      cartCount: 0,
      selectedItems: [],
    });

    localStorage.removeItem("user");
    history.push("/");

    closeConfirmDialog();
  };

  const closeConfirmDialog = () => {
    setOpenConfirmDialog({
      confirmLogOut: false,
    });
  };

  const defineModalType = () => {
    if (modalState.signInClicked) return "signIn";
    if (modalState.regClicked) return "registration";

    return;
  };

  return (
    <>
      <header className="header center-y">
        <div className="header__logo center-y" onClick={onHomeClickHandler}>
          <img className="header__logo--img" src={logoOutlined} />
          <h1 className="header__logo--title">
            <span>donny</span>
            <span>play</span>
          </h1>
        </div>

        <div className="center-y" style={{ marginLeft: "auto" }}>
          <nav className="header__navbar">
            <NavLink
              to="/"
              exact
              className="header__link"
              activeClassName="header__link--active"
              onClick={onLinkClickHandler}
            >
              Home
            </NavLink>
            <Dropdown
              className="header__link"
              options={productsItems}
              value={dropdownState}
              onChange={changeDropdownHandler}
            />
            <NavLink
              to="/about"
              className="header__link"
              activeClassName="header__link--active"
              onClick={onLinkClickHandler}
            >
              About
            </NavLink>
          </nav>

          <div
            className="header__login-container"
            style={isLogged ? { marginLeft: "52px" } : {}}
          >
            {!isLogged ? (
              <>
                <button
                  className="header__link"
                  type="button"
                  onClick={onLogInClickHandler}
                >
                  Sign In
                </button>
                <button
                  className="header__link header__reg-btn"
                  type="button"
                  onClick={onRegClickHandler}
                >
                  Registration
                </button>
              </>
            ) : (
              <>
                <button
                  className="header__cart-btn"
                  type="button"
                  onClick={onCartClickHandler}
                  title="Shopping Cart"
                >
                  <div className="header__cart-btn-counter">
                    <span className="header__cart-btn-counter--number">
                      {userCartCount}
                    </span>
                  </div>
                  <img className="header__cart-img" src={cartIcon} />
                </button>
                <div
                  className="header__login-handler"
                  onClick={onUserClickHandler}
                  title="Profile"
                >
                  <p className="header__link">{userLogin}</p>
                  <img className="header__user-icon" src={userIcon} />
                </div>
                <button
                  className="header__link header__reg-btn"
                  type="button"
                  onClick={() => {
                    setOpenConfirmDialog({
                      confirmLogOut: true,
                    });
                  }}
                >
                  Log Out
                </button>
                {openConfirmDialog.confirmLogOut && (
                  <ConfirmDialog
                    title="Confirm Log Out"
                    confirmHandler={logOutHandler}
                    onCloseClick={closeConfirmDialog}
                  >
                    {
                      <p>
                        Are sure that you want to log out? Please note that all
                        items from your shopping cart will be removed.
                      </p>
                    }
                  </ConfirmDialog>
                )}
              </>
            )}
          </div>
        </div>

        <div className="header__burger"></div>
      </header>

      {modalState.isOpened && (
        <Modal
          type={defineModalType()}
          confirmUserAuthentication={confirmUserAuthentication}
          onCloseClick={() =>
            setModalState({
              isOpened: false,
              signInClicked: false,
              regClicked: false,
            })
          }
        >
          <InputText
            fieldLabel="Login:"
            fieldName="login"
            fieldType="text"
            message="Enter your login here..."
          ></InputText>
          <InputText
            fieldLabel="Password:"
            fieldName="password"
            fieldType="password"
            message="Enter your password here..."
          ></InputText>
          {modalState.regClicked ? (
            <InputText
              fieldLabel="Confirm password:"
              fieldName="confirmPassword"
              fieldType="password"
              message="Repeat your password here..."
            ></InputText>
          ) : (
            ""
          )}
        </Modal>
      )}
    </>
  );
};

export default React.memo(Header);
