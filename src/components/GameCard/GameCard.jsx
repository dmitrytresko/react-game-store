import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_CART_DATA, SET_CURRENT_GAME } from "../../redux/actions";
import "./styles.scss";

const GameCard = ({ gameDetails, openEditGameModalState }) => {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector(state => state.user?.isLogged);
  const isUserAdmin = useSelector(state => state.user?.isAdmin);
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
              gameImage: gameDetails.path
            }
          ]
        }
      });
    }
  }

  const editItemHandler = () => {
    openEditGameModalState();

    if (gameDetails) {
      dispatch({
        type: SET_CURRENT_GAME,
        payload: {
          currentGame: {
            gameId: gameDetails.id,
            gameGenre: gameDetails.genre,
            gameName: gameDetails.name,
            gamePrice: gameDetails.price,
            gameCompany: gameDetails.company,
            gameAge: gameDetails.age,
            gameImage: gameDetails.path
          }
        }
      });
    }
  }

  return (
    <div className="game-card">
      <div className="game-card__cover-wrapper">
        <img className="game-card__cover" src={gameDetails.path} alt={gameDetails.name} />
        {isUserLoggedIn &&
          <>
            <button className="game-card__add-btn" onClick={() => addItemToCartHandler(gameDetails)}>Add To Cart</button>
            {isUserAdmin && <button className="game-card__edit-btn" onClick={editItemHandler}>Edit Game</button>}
          </>
        }
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

export default React.memo(GameCard);
