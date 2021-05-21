/* eslint-disable*/
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_CART_COUNT, SET_SELECTED_ITEMS } from "../../redux/actions";
import "./styles.scss";

const CartPg = () => {
  const userCartCount = useSelector(state => state.user?.cartCount);
  const userSelectedItems = useSelector(state => state.user?.selectedItems);

  const history = useHistory();

  const toProductsLinkClickHandler = () => {
    history.push('/products');
  }

  return (
      <div className="cart">
        <h2 className="page-title">Shopping cart</h2>

        {userCartCount ?
          <>
            <p>You have something in your cart</p>
          </>
          :
          <>
            <p>You have no items in your cart.</p>
            <p>Click <a onClick={toProductsLinkClickHandler}>here</a> to continue shopping</p>
          </>
        }
      </div>
  )
}

export default CartPg;
