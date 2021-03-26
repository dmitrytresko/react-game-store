import "./styles.scss";

const CategoryCard = (props) => {
  return (
    <div className="category-card">
      <img className="category-card__logo" src={props.path} alt={props.altName} />
      <h2 className="category-card__name">{props.name}</h2>
    </div>
  )
}

export default CategoryCard;
