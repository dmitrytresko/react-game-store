import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const CategoryCard = (props) => {
  const history = useHistory();

  return (
    <div
      className="category-card flex-column flex-center"
      onClick={() => history.push(`${props.route}`)}
      style={props.style}
    >
      <img
        className="category-card__logo"
        src={props.path}
        alt={props.altName}
      />
      <img
        className="category-card__logo--light"
        src={props.pathLight}
        alt={props.altNameLight}
      />
      <p className="category-card__name">{props.name}</p>
    </div>
  );
};

export default React.memo(CategoryCard);
