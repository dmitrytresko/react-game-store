/* eslint-disable*/
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { /* SET_CART_COUNT, SET_SELECTED_ITEMS */ SET_CART_DATA} from "../../redux/actions";
import trashImg from "../../assets/img/trash.png"
import leftArrowImg from "../../assets/img/left-arrow.png";
import rightArrowImg from "../../assets/img/right-arrow.png";
import emptyCartImg from "../../assets/img/empty-cart.png"
import "./styles.scss";

const CartPg = () => {
  const [cartTotal, setCartTotal] = useState(0);

  const userCartCount = useSelector(state => state.user?.cartCount);
  const userSelectedItems = useSelector(state => state.user?.selectedItems);

  const history = useHistory();

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

  const getListOfUniqueItems = (arr, key) => {
    const resultArr = arr.filter((item, idx, array) => {
      return array.map(mapItem => mapItem[key]).indexOf(item[key]) === idx;
    })

    return resultArr;
  }

  const getRelevantItemQuantity = itemId => {
    const relevantItems = userSelectedItems.filter(item => item.gameId === itemId);

    return relevantItems.length;
  }

  const decreaseItemQuantity = idxOfItemToDelete => {
    const idxOfItemToDecrease = userSelectedItems.findIndex(item => item.gameId === idxOfItemToDelete);

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

  const calculateSubtotal = (gameId, gamePrice) => {
    return (gamePrice * getRelevantItemQuantity(gameId)).toFixed(2);
  }

  const calculateCartTotal = () => {
    let result = 0

    getListOfUniqueItems(userSelectedItems, 'gameId').forEach(({ gameId, gamePrice }) => {
      const gameSubtotal = calculateSubtotal(gameId, gamePrice);

      result += +gameSubtotal;
    })

    setCartTotal(result.toFixed(2));
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

  const continueShoppingHandler = () => {
    history.push('/products');
  }

  const clearCartHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    dispatch({
      type: SET_CART_DATA,
      payload: {
        newCartCount: 0,
        selectedItems: []
      }
    });
  }

  const checkoutHandler = () => {
    alert(`You're going to buy ${userCartCount} item(-s) for $${cartTotal}`);
  }

  useEffect(() => {
    calculateCartTotal();
  })

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, [])

  return (
      <div className="cart">
        {!userCartCount && <h2 className="page-title">Shopping cart</h2>}

        {userCartCount ?
        <>
          <table style={userCartCount && { marginTop: '70px' }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Platform</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getListOfUniqueItems(userSelectedItems, 'gameId')?.map(item => (
                <tr key={item.gameId}>
                  <td>{item.gameName}<br></br><p className="cart__company-name">by {item.gameCompany}</p></td>
                  <td>{showRelevantCategoryName(item.gameId)}</td>
                  <td>${item.gamePrice}</td>
                  <td>
                    <div className="cart__quantity-changer">
                      <button onClick={() => decreaseItemQuantity(item.gameId)} className={getRelevantItemQuantity(item.gameId) === 1 ? "disabled-btn" : ""}>
                        <img src={leftArrowImg} />
                      </button>
                        <span>{getRelevantItemQuantity(item.gameId)}</span>
                      <button onClick={() => increaseItemQuantity(item)}>
                        <img src={rightArrowImg} />
                      </button>
                    </div>
                  </td>
                  <td>${calculateSubtotal(item.gameId, item.gamePrice)}</td>
                  <td>
                    <button className="cart__delete-btn" onClick={() => deleteGameFromCart(item.gameId)}>
                      <img className="cart__delete-btn--image" src={trashImg} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr className="cart__divider"/>

          <div className="cart__actions-handler">
            <div className="cart__total-text">Cart Total: ${cartTotal}</div>
            <div className="cart__actions-handler--inner">
              <button className="cart__action-btn clear-btn" onClick={clearCartHandler}>Clear Cart</button>
              <button button className="cart__action-btn" onClick={continueShoppingHandler}>Continue Shopping</button>
              <button className="cart__action-btn checkout-btn" onClick={checkoutHandler}>Proceed To Checkout</button>
            </div>
          </div>
        </>
          :
          <>
            <p className="cart__text">You have no items in your cart.</p>
            <p className="cart__text">Click <a className="cart__link" onClick={continueShoppingHandler}>here</a> to continue shopping</p>
            <img className="cart__empty-cart-img" src={emptyCartImg} />
          </>
        }
      </div>
  )
}

export default CartPg;
