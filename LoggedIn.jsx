import { Route, Routes } from "react-router-dom";
import LoggedInNav from "./LoggedInNav";
import Home from "./Home";
import ProductPage from "./ProductPage";
import Cart from "./Cart";
import Account from "./Account";
import { useState, useEffect } from "react";
import axios from "axios";
import IndividualProductPage from "./IndividualProductPage";

function LoggedIn({ setIsAuthenticated, isAuthenticated, currentUser }) {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products");
        const productsArray = await response.json();
        setProducts(productsArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    axios
      .get("/cart_items", { withCredentials: true })
      .then((response) => {
        setCart(response.data);
        // Update cart items in the server
        response.data.forEach((item) => {
          axios.put(
            `/cart_items/${item.id}`,
            {
              user_id: currentUser.id,
              cart_id: currentUser.cart.id,
              product_id: item.product_id,
              quantity: item.quantity,
            },
            { withCredentials: true }
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const addToCart = (product) => {
  //   if (!product || !product.id) {
  //     console.log("Invalid product");
  //     return;
  //   }

  //   // Make a POST request to add the product to the cart
  //   axios
  //     .post(
  //       "/cart_items",
  //       {
  //         user_id: currentUser.id,
  //         cart_id: currentUser.cart.id,
  //         product_id: product.id,
  //         quantity: quantity,
  //       },
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       setCart(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const addToCart = async (product) => {
    if (!product || !product.id) {
      console.log("Invalid product");
      return cart;
    }

    axios
      .post(
        "/cart_items",
        {
          user_id: currentUser.id,
          cart_id: currentUser.cart.id,
          product_id: product.id,
          quantity: quantity,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setCart([...cart, response.data]); // Add the new cart item to the existing cart state
        setQuantity(1); // Reset the quantity input field
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <LoggedInNav
        setIsAuthenticated={setIsAuthenticated}
        currentUser={currentUser}
        cart={cart}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home isAuthenticated={isAuthenticated} currentUser={currentUser} />
          }
        />
        <Route
          path="/shop"
          element={
            <ProductPage
              currentUser={currentUser}
              setCart={setCart}
              addToCart={addToCart}
              products={products}
              setProducts={setProducts}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart currentUser={currentUser} cart={cart} setCart={setCart} />
          }
        />
        <Route
          path="/account"
          element={<Account currentUser={currentUser} />}
        />
        <Route path="/products/:id" element={<IndividualProductPage />} />
      </Routes>
    </div>
  );
}

export default LoggedIn;
