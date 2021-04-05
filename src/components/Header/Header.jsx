import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import 'react-dropdown/style.css';
import "./styles.scss";

const Header = () => {
  const history = useHistory();
  const productsItems = ["PlayStation", "Xbox", "PC"];
  const [dropdownState, setDropdownState] = useState("Products");

  // const [isLogged, setIsLogged] = useState(false);

  const [modalState, setModalState] = useState({ isOpened: false, signInClicked: false, regClicked: false });

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
  }

  const onLogInClickHandler = (event) => {
    if (event.target.textContent === "Sign In") {
      setModalState({ isOpened: true, signInClicked: true, regClicked: false });
    }

    if (event.target.textContent === "Registration") {
      setModalState({ isOpened: true, signInClicked: false, regClicked: true });
    }
  }

  return (
    <>
      <header className="header">
        <h1 className="header__title" onClick={() => history.push("/")}>Best Games Store</h1>
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
        <div className="header__login-container">
          <button className="header__link header__login-btn" type="button" onClick={onLogInClickHandler}>Sign In</button>
          <button className="header__link header__login-btn" type="button" onClick={onLogInClickHandler}>Registration</button>
        </div>
        <div className="header__burger"></div>
      </header>

      <Modal opened={modalState.isOpened}
             type={`${modalState.signInClicked ? "Sign In" : "Registration"}`}
             onCloseClick={() => setModalState({ isOpened: false, signInClicked: false, regClicked: false })}>
        {modalState.signInClicked ? (
          <>
            <InputText fieldName="Login:" message="Enter your login here..."></InputText>
            <InputText fieldName="Password:" message="Enter your password here..."></InputText>
          </>
        ):
        modalState.regClicked ? (
          <>
            <InputText fieldName="Login:" message="Enter your login here..."></InputText>
            <InputText fieldName="Password:" message="Enter your password here..."></InputText>
            <InputText fieldName="Password:" message="Repeat your password here..."></InputText>
          </>
        ) : ""}
      </Modal>
    </>
  )
}

export default Header;
