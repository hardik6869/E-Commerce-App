const calcTotalPrice = (cart) => {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // Product can be deleted. but they can be still be in your cart.
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
};

export default calcTotalPrice;
