import { useState } from "react";
import ProductList from "./ProductList";
import "./App.css";
function ProductPage({
  currentUser,
  addToCart,
  products,
  quantity,
  setQuantity,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-page">
      <div className="search-h1">
        <h2 className="shop-h2">Shop</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <ProductList
        className="product-list"
        products={filteredProducts}
        addToCart={addToCart}
        currentUser={currentUser}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  );
}

export default ProductPage;
