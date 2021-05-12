import "./styles.scss";

const GameCard = (props) => {
  return (
    <div className="game-card">
      <img className="game-card__cover" src={props.gameDetails.path} alt={props.gameDetails.name} />
      <button className="game-card__order-btn">Add to cart</button>
      <div className="game-card__details-container">
        <div className="game-card__info">
          <h3 className="game-card__title">{props.gameDetails.name}</h3>
          <img className="game-card__rating" src={props.gameDetails.rating} alt="Star rating" />
        </div>
        <div className="game-card__info">
          <p className="game-card__company">{props.gameDetails.company}</p>
          <p className="game-card__price">${props.gameDetails.price}</p>
        </div>
      </div>
    </div>
  )
}

export default GameCard;
