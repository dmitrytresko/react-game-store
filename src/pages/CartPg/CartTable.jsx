import React from "react";
import CartTableRow from "./CartTableRow";

const CartTable = ({
  userCartCount,
  userSelectedItems,
  uniqueItemsList,
  getRelevantItemQuantity,
  calculateSubtotal,
}) => {
  return (
    <table>
      <thead className="cart__table-head">
        <tr>
          <th className="cart__table-head-td">Product</th>
          <th className="cart__table-head-td">Platform</th>
          <th className="cart__table-head-td">Price</th>
          <th className="cart__table-head-td">Quantity</th>
          <th className="cart__table-head-td">Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {uniqueItemsList?.map((item) => (
          <CartTableRow
            key={item.gameId}
            game={item}
            userCartCount={userCartCount}
            userSelectedItems={userSelectedItems}
            getRelevantItemQuantity={getRelevantItemQuantity}
            calculateSubtotal={calculateSubtotal}
          />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(CartTable);
