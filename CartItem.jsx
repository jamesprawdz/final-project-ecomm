import React, { useState } from "react";
import axios from "axios";

function CartItem({ item, setCart, setCurrentUser }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleRemoveItem = async () => {
    try {
      await axios.delete(`/cart_items/${item.id}`);
      // Fetch cart items again to update state
      fetchCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuantity = async (newQuantity) => {
    try {
      await axios.patch(`/cart_items/${item.id}`, {
        quantity: newQuantity,
      });
      setQuantity(newQuantity);
      // Fetch cart items again to update state
      fetchCartItems();
      setCurrentUser((prevState) => ({
        ...prevState,
        cart: {
          ...prevState.cart,
          total:
            prevState.cart.total +
            item.product.price * (newQuantity - quantity),
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartItems = async () => {
    axios
      .get("/cart_items", { withCredentials: true })
      .then((response) => {
        setCart(response.data);
        updateTotal(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTotal = (cartItems) => {
    const newTotal = cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.quantity * currentItem.product.price,
      0
    );
    setCurrentUser((prevState) => ({
      ...prevState,
      cart: { id: prevState.cart.id, total: newTotal },
    }));
  };

  return (
    <div>
      <h3>{item.product.name}</h3>
      <p>Price: {item.product.price}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={() => handleUpdateQuantity(quantity - 1)}>
        Decrease quantity
      </button>
      <button onClick={() => handleUpdateQuantity(quantity + 1)}>
        Increase quantity
      </button>
      <button onClick={handleRemoveItem}>Remove from cart</button>
    </div>
  );
}

export default CartItem;
