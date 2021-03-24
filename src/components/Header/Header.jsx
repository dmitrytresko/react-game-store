import { NavLink } from "react-router-dom";
import "./styles.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Best Games Market</h1>
        <nav className="header__navigation">
          <NavLink to="/" exact className="header__link" activeClassName="header__link--active">Home</NavLink>
          <NavLink to="/products" className="header__link" activeClassName="header__link--active">Products</NavLink>
          <NavLink to="/about" className="header__link" activeClassName="header__link--active">About</NavLink>
        </nav>
    </header>
  )
}

export default Header;
