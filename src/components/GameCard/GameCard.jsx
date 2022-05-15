import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartData, setCurrentGame } from "../../redux/actions";
import addToWishlistImg from "../../assets/img/card-items/add-to-wishlist.png";
import addToCartImg from "../../assets/img/card-items/add-to-cart.png";
import editImg from "../../assets/img/card-items/edit.png";
import "./styles.scss";

const GameCard = ({ gameDetails, openEditGameModalState }) => {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((state) => state.user?.isLogged);
  const isUserAdmin = useSelector((state) => state.user?.isAdmin);
  const userCartCount = useSelector((state) => state.user?.cartCount);
  const userSelectedItems = useSelector((state) => state.user?.selectedItems);

  const addItemToCartHandler = () => {
    if (isUserLoggedIn) {
      dispatch(
        setCartData({
          newCartCount: userCartCount + 1,
          selectedItems: [
            ...userSelectedItems,
            {
              gameId: gameDetails.id,
              gameName: gameDetails.name,
              gamePrice: gameDetails.price,
              gameCompany: gameDetails.company,
              gameImage: gameDetails.path,
            },
          ],
        })
      );
    }
  };

  const editItemHandler = () => {
    openEditGameModalState();

    if (gameDetails) {
      dispatch(
        setCurrentGame({
          currentGame: {
            gameId: gameDetails.id,
            gameGenre: gameDetails.genre,
            gameName: gameDetails.name,
            gamePrice: gameDetails.price,
            gameCompany: gameDetails.company,
            gameAge: gameDetails.age,
            gameRating: gameDetails.metaRating,
            gameImage: gameDetails.path,
          },
        })
      );
    }
  };

  return (
    <div className="game-card">
      <div className="game-card__cover-wrapper">
        <img
          className="game-card__cover"
          src={gameDetails.path}
          alt={gameDetails.name}
        />
        {isUserLoggedIn && (
          <>
            <button className="game-card__btn wishlist-btn center-x">
              <img className="game-card__btn--img" src={addToWishlistImg} />
              Add To Wishlist
            </button>
            <button
              className="game-card__btn add-btn center-x"
              onClick={addItemToCartHandler}
            >
              <img className="game-card__btn--img" src={addToCartImg} />
              Add To Cart
            </button>
            {isUserAdmin && (
              <button
                className="game-card__btn edit-btn center-x"
                onClick={editItemHandler}
              >
                <img className="game-card__btn--img" src={editImg} />
                Edit Game
              </button>
            )}
          </>
        )}
      </div>
      <div className="game-card__details-container">
        <div className="game-card__info">
          <h3 className="game-card__title">{gameDetails.name}</h3>
          <img
            className="game-card__rating"
            src={gameDetails.rating}
            alt="Star rating"
          />
        </div>
        <div className="game-card__info">
          <p className="game-card__company">{gameDetails.company}</p>
          <p className="game-card__price">${gameDetails.price}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameCard);
