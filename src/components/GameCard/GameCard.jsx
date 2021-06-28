import { useDispatch, useSelector } from "react-redux";
import { SET_CART_DATA } from "../../redux/actions";
import "./styles.scss";

const GameCard = ({ gameDetails }) => {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector(state => state.user?.isLogged);
  const userCartCount = useSelector(state => state.user?.cartCount);
  const userSelectedItems = useSelector(state => state.user?.selectedItems);

  const addItemToCartHandler = () => {
    if (isUserLoggedIn) {
      dispatch({
        type: SET_CART_DATA,
        payload: {
          newCartCount: userCartCount + 1,
          selectedItems: [
            ...userSelectedItems,
            {
              gameId: gameDetails.id,
              gameName: gameDetails.name,
              gamePrice: gameDetails.price,
              gameCompany: gameDetails.company,
            }
          ]
        }
      });
    }
  }

  return (
    <div className="game-card">
      <div className="game-card__cover-wrapper">
        <img className="game-card__cover" src={gameDetails.path} alt={gameDetails.name} />
        {isUserLoggedIn && <button className="game-card__order-btn" onClick={addItemToCartHandler}>Add To Cart</button>}
      </div>
      <div className="game-card__details-container">
        <div className="game-card__info">
          <h3 className="game-card__title">{gameDetails.name}</h3>
          <img className="game-card__rating" src={gameDetails.rating} alt="Star rating" />
        </div>
        <div className="game-card__info">
          <p className="game-card__company">{gameDetails.company}</p>
          <p className="game-card__price">${gameDetails.price}</p>
        </div>
      </div>
    </div>
  )
}

export default GameCard;
