/* eslint-disable*/
import React, { useEffect, useMemo } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartData } from "../../redux/actions";
import emptyCartImg from "../../assets/img/empty-cart.jpg";
import CartTable from './CartTable';
import "./styles.scss";

const CartPg = () => {
  const userCartCount = useSelector(state => state.user?.cartCount);
  const userSelectedItems = useSelector(state => state.user?.selectedItems);

  const history = useHistory();

  const dispatch = useDispatch();

  const getListOfUniqueItems = (arr, key) => {
    const resultArr = arr.filter((item, idx, array) => {
      return array.map(mapItem => mapItem[key]).indexOf(item[key]) === idx;
    })

    return resultArr;
  }

  const uniqueItemsList = useMemo(() => getListOfUniqueItems(userSelectedItems, 'gameId'), [userSelectedItems]);

  const getRelevantItemQuantity = itemId => {
    const relevantItems = userSelectedItems.filter(item => item.gameId === itemId);

    return relevantItems.length;
  }

  const calculateSubtotal = (gameId, gamePrice) => {
    return (gamePrice * getRelevantItemQuantity(gameId)).toFixed(2);
  }

  const calculateCartTotal = () => {
    let result = 0

    uniqueItemsList.forEach(({ gameId, gamePrice }) => {
      const gameSubtotal = calculateSubtotal(gameId, gamePrice);

      result += +gameSubtotal;
    })

    return result.toFixed(2);
  }

  const continueShoppingHandler = () => {
    history.push('/products');
  }

  const clearCartHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    dispatch(
      setCartData({
        newCartCount: 0,
        selectedItems: []
      })
    );
  }

  const checkoutHandler = () => {
    alert(`You're going to buy ${userCartCount} item(-s) for $${cartTotal}`);
  }

  const cartTotal = useMemo(calculateCartTotal, [userCartCount]);

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, [])

  return (
      <div className="cart">
        {!userCartCount && <h2 className="page-title">Shopping cart</h2>}

        {userCartCount > 0 ?
          <>
            <CartTable
              userCartCount={userCartCount}
              userSelectedItems={userSelectedItems}
              uniqueItemsList={uniqueItemsList}
              getRelevantItemQuantity={getRelevantItemQuantity}
              calculateSubtotal={calculateSubtotal}
            />

            <hr className="cart__divider"/>

            <div className="cart__actions-handler">
              <div className="cart__total-text">Cart Total: ${cartTotal}</div>
              <div className="cart__actions-handler--inner">
                <button className="cart__action-btn clear-btn" onClick={clearCartHandler}>Clear Cart</button>
                <button className="cart__action-btn" onClick={continueShoppingHandler}>Continue Shopping</button>
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
