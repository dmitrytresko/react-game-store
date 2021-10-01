import React from "react";
import { useDispatch } from "react-redux";
import { SET_CART_DATA } from "../../redux/actions";
import trashImg from "../../assets/img/trash.jpg";
import leftArrowImg from "../../assets/img/left-arrow.jpg";
import rightArrowImg from "../../assets/img/right-arrow.jpg";

const CartTableRow = ({ game, userCartCount, userSelectedItems, getRelevantItemQuantity, calculateSubtotal }) => {
  const dispatch = useDispatch();

  const showRelevantCategoryName = gameId => {
    if (gameId >= 100 && gameId < 200) {
      return 'PS4';
    }
    if (gameId >= 200 && gameId < 300) {
      return 'Xbox';
    }
    if (gameId >= 300) {
      return 'PC';
    }
  }

  const decreaseItemQuantity = idxOfItemToDelete => {
    const idxOfItemToDecrease = userSelectedItems.map(item => item.gameId).lastIndexOf(idxOfItemToDelete);

    if (idxOfItemToDecrease > -1) {
      userSelectedItems.splice(idxOfItemToDecrease, 1);

      dispatch({
        type: SET_CART_DATA,
        payload: {
          newCartCount: userCartCount - 1,
          selectedItems: userSelectedItems
        }
      });
    }
  }

  const increaseItemQuantity = itemToAdd => {
    const selectedItemsIncreased = [
      ...userSelectedItems,
      itemToAdd
    ];

    dispatch({
      type: SET_CART_DATA,
      payload: {
        newCartCount: userCartCount + 1,
        selectedItems: selectedItemsIncreased
      }
    });
  }

  const deleteGameFromCart = gameToDeleteId => {
    const newSelectedItemsArr = userSelectedItems.filter(item => item.gameId !== gameToDeleteId);

    dispatch({
      type: SET_CART_DATA,
      payload: {
        newCartCount: newSelectedItemsArr.length,
        selectedItems: newSelectedItemsArr
      }
    });
  }

  return (
    <tr key={game.gameId}>
      <td>
        {game.gameName}
        <br></br>
        <p className="cart__company-name">by {game.gameCompany}</p>
      </td>
      <td>{showRelevantCategoryName(game.gameId)}</td>
      <td>${game.gamePrice}</td>
      <td>
        <div className="cart__quantity-changer">
          <button
            onClick={() => decreaseItemQuantity(game.gameId)}
            className={
              getRelevantItemQuantity(game.gameId) === 1 ? "disabled-btn" : ""
            }
          >
            <img src={leftArrowImg} />
          </button>
          <span>{getRelevantItemQuantity(game.gameId)}</span>
          <button onClick={() => increaseItemQuantity(game)}>
            <img src={rightArrowImg} />
          </button>
        </div>
      </td>
      <td>${calculateSubtotal(game.gameId, game.gamePrice)}</td>
      <td>
        <button
          className="cart__delete-btn"
          onClick={() => deleteGameFromCart(game.gameId)}
        >
          <img className="cart__delete-btn--image" src={trashImg} />
        </button>
      </td>
    </tr>
  );
};

export default React.memo(CartTableRow);
