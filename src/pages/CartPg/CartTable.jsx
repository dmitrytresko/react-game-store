import React from "react";
import CartTableRow from './CartTableRow';

const CartTable = ({ userCartCount, userSelectedItems, uniqueItemsList, getRelevantItemQuantity, calculateSubtotal }) => {
  return (
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
        {uniqueItemsList?.map(item => (
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
