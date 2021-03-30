import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "./styles.scss";

const Header = () => {
  const history = useHistory();
  const productsItems = ["PlayStation", "Xbox", "PC"];
  const [dropdownState, setDropdownState] = useState("Products");

  useEffect(() => {
    if (dropdownState === "PlayStation") {
      history.push("/products/ps");
    }
    if (dropdownState === "Xbox") {
      history.push("/products/xbox");
    }
    if (dropdownState === "PC") {
      history.push("/products/pc");
    }

    return setDropdownState("Products");
  }, [dropdownState])

  return (
    <header className="header">
      <h1 className="header__title" onClick={() => history.push("/")}>Best Games Store</h1>
      <nav className="header__navbar">
        <NavLink to="/" exact className="header__link" activeClassName="header__link--active">Home</NavLink>
        <Dropdown className="header__link"
                  options={productsItems}
                  value={dropdownState}
                  onChange={event => {
                    setDropdownState(event.value);
                  }} />
        <NavLink to="/about" className="header__link" activeClassName="header__link--active">About</NavLink>
      </nav>
      <div className="header__burger"></div>
    </header>
  )
}

export default Header;
