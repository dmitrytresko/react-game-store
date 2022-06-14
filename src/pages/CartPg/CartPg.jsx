/* eslint-disable*/
import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartData } from "../../redux/actions";
import emptyCartImg from "../../assets/img/empty-cart.jpg";
import warningIcon from "../../assets/img/warning.png";
import clearCartIcon from "../../assets/img/clear-cart.png";
import CartTable from "./CartTable";
import { sales } from "../../common/sales";
import "./styles.scss";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";

const CartPg = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userCartCount = useSelector((state) => state.user?.cartCount);
  const userSelectedItems = useSelector((state) => state.user?.selectedItems);

  const [openConfirmDialog, setOpenConfirmDialog] = useState({
    confirmClearCart: false,
    confirmCheckout: false,
  });
  const [isPromoOpened, setIsPromoOpened] = useState(false);
  const [isPromoActivated, setIsPromoActivated] = useState(false);
  const [promoValue, setPromoValue] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const currentSale = sales[0];

  const getListOfUniqueItems = (arr, key) => {
    const resultArr = arr.filter((item, idx, array) => {
      return array.map((mapItem) => mapItem[key]).indexOf(item[key]) === idx;
    });

    return resultArr;
  };

  const uniqueItemsList = useMemo(
    () => getListOfUniqueItems(userSelectedItems, "gameId"),
    [userSelectedItems]
  );

  const getRelevantItemQuantity = (itemId) => {
    const relevantItems = userSelectedItems.filter(
      (item) => item.gameId === itemId
    );

    return relevantItems.length;
  };

  const calculateSubtotal = (gameId, gamePrice) => {
    return (gamePrice * getRelevantItemQuantity(gameId)).toFixed(2);
  };

  const calculateCartTotal = () => {
    let result = 0;

    uniqueItemsList.forEach(({ gameId, gamePrice }) => {
      const gameSubtotal = calculateSubtotal(gameId, gamePrice);

      result += +gameSubtotal;
    });

    return result.toFixed(2);
  };

  const changePromoValueHandler = (e) => {
    setPromoValue(e.target.value);
    setPromoError("");
  };

  const applyPromoHandler = () => {
    if (
      promoValue.toLocaleLowerCase() === currentSale.promo.toLocaleLowerCase()
    ) {
      setIsPromoActivated(true);
      setPromoValue("");
      setPromoError("");
    } else {
      setPromoError("Such promo code isn't used currently. Try another one");
    }
  };

  const goToProducts = () => {
    history.push("/products");
  };

  const clearCartHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(
      setCartData({
        newCartCount: 0,
        selectedItems: [],
      })
    );
  };

  const checkoutHandler = () => {
    alert(`You're going to buy ${userCartCount} item(-s) for $${cartTotal}`);
  };

  const cartTotal = useMemo(calculateCartTotal, [userCartCount]);

  useEffect(() => {
    if (isPromoActivated) {
      setPromoDiscount(((cartTotal * currentSale?.discount) / 100).toFixed(2));
    }
  }, [cartTotal, isPromoActivated]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="cart">
      <h2 className="page-title">Shopping cart</h2>

      {userCartCount > 0 ? (
        <div
          className="wrapper center-x"
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-start",
            marginTop: "32px",
            gap: "32px",
          }}
        >
          <div
            className="flex-column"
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "100%",
                minWidth: "782px",
                maxHeight: "528px",
                overflow: "auto",
              }}
            >
              <CartTable
                userCartCount={userCartCount}
                userSelectedItems={userSelectedItems}
                uniqueItemsList={uniqueItemsList}
                getRelevantItemQuantity={getRelevantItemQuantity}
                calculateSubtotal={calculateSubtotal}
              />
            </div>
          </div>

          <div
            className="flex-column center-x"
            style={{ width: "32.5%", minWidth: "264px" }}
          >
            <div className="cart__actions-handler flex-column ">
              <div
                className="cart__actions-handler--inner"
                style={{ cursor: "pointer" }}
                onClick={() => setIsPromoOpened(!isPromoOpened)}
              >
                <p className="cart__text">Want to use promo code?</p>
                <div className="cart__text">{isPromoOpened ? "-" : "+"}</div>
              </div>
              {isPromoOpened && (
                <div className="cart__promo-section">
                  <input
                    className="cart__promo-section__input"
                    style={{ margin: "12px 0 8px" }}
                    placeholder="Enter your promo here..."
                    value={promoValue}
                    onChange={(e) => changePromoValueHandler(e)}
                  />
                  {promoError && (
                    <div className="cart__promo-section__error">
                      <img
                        className="cart__promo-section__error--icon"
                        src={warningIcon}
                      />
                      {promoError}
                    </div>
                  )}
                  <button
                    className="btn submit-btn"
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      minWidth: 0,
                      maxWidth: "100%",
                    }}
                    disabled={!promoValue}
                    onClick={applyPromoHandler}
                  >
                    Apply
                  </button>
                </div>
              )}

              <hr className="divider" style={{ margin: "24px 0 20px" }} />

              <div className="flex-column">
                <div
                  className="cart__actions-handler--inner"
                  style={{ marginBottom: "8px" }}
                >
                  <span className="cart__total-text">Initial Total</span>
                  <span className="cart__total-text">${cartTotal}</span>
                </div>
                <div className="cart__actions-handler--inner">
                  <span className="cart__total-text">Discount</span>
                  <span className="cart__total-text">${promoDiscount}</span>
                </div>

                <hr className="divider" style={{ margin: "20px 0" }} />

                <div className="cart__actions-handler--inner">
                  <span
                    className="cart__total-text"
                    style={{ fontWeight: "400" }}
                  >
                    Cart Total
                  </span>
                  <span
                    className="cart__total-text"
                    style={{ fontWeight: "400" }}
                  >
                    ${(cartTotal - promoDiscount).toFixed(2)}
                  </span>
                </div>
                <button
                  className="cart__action-btn btn success-btn"
                  onClick={checkoutHandler}
                  style={{ marginTop: "24px" }}
                >
                  Checkout
                </button>
                {openConfirmDialog.confirmCheckout && (
                  <ConfirmDialog
                    onCloseClick={() =>
                      setOpenConfirmDialog({
                        confirmClearCart: false,
                        confirmCheckout: false,
                      })
                    }
                  />
                )}
              </div>
            </div>

            <div style={{ width: "100%", padding: "0 24px" }}>
              <div
                className="clear-link"
                onClick={() =>
                  setOpenConfirmDialog({
                    confirmClearCart: true,
                    confirmCheckout: false,
                  })
                }
              >
                <img src={clearCartIcon} className="clear-link--img" />
                <span>Clear Cart</span>
              </div>
            </div>
          </div>
          {openConfirmDialog.confirmClearCart && (
            <ConfirmDialog
              title="Confirm Clear Cart"
              bodyText="Are you sure that you want to clear your shopping cart? Please note that all items from your shopping cart will be removed after confirming this action."
              confirmHandler={clearCartHandler}
              onCloseClick={() =>
                setOpenConfirmDialog({
                  confirmClearCart: false,
                  confirmCheckout: false,
                })
              }
            />
          )}
        </div>
      ) : (
        <div className="wrapper flex-column center-x">
          <img className="cart__empty-cart-img" src={emptyCartImg} />
          <p className="cart__text">You have no items in your cart</p>
          <button className="btn submit-btn" onClick={goToProducts}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPg;
