import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const CategoryCard = (props) => {
  const history = useHistory();

  return (
    <div className="category-card" onClick={() => history.push(`${props.route}`)}>
      <img className="category-card__logo" src={props.path} alt={props.altName} />
      <img className="category-card__logo--light" src={props.pathLight} alt={props.altNameLight} />
      <h2 className="category-card__name">{props.name}</h2>
    </div>
  )
}

export default React.memo(CategoryCard);
