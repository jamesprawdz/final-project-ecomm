import React from "react";
import CartItem from "./CartItem";
import axios from "axios";

function Cart({ setCurrentUser, currentUser, cart, setCart }) {
  const handleCheckout = () => {
    axios
      .post(
        "/checkout",
        {
          user_id: currentUser.id,
          cart_id: currentUser.cart.id,
          destroy_items: true, // added parameter to destroy all cart items
        },
        { withCredentials: true }
      )
      .then((response) => {
        setCart([]);
        setCurrentUser((prevState) => ({
          ...prevState,
          cart: { id: prevState.cart.id, total: 0 },
        }));
        alert("Order was successful!");
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error with your order. Please try again.");
      });
  };

  const handleSetCart = (newCart) => {
    setCart(newCart);
    const newTotal = newCart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setCurrentUser((prevState) => ({
      ...prevState,
      cart: { ...prevState.cart, total: newTotal },
    }));
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cart && cart.length > 0 ? (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            setCart={handleSetCart}
            setCurrentUser={setCurrentUser}
          />
        ))
      ) : (
        <p>Your cart is currently empty.</p>
      )}
      <h3>${currentUser.cart?.total}</h3>
      {cart.length > 0 && <button onClick={handleCheckout}>Checkout</button>}
    </div>
  );
}

export default Cart;
