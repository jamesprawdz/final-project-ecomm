import ProductCard from "./ProductCard";

function ProductList({
  products,
  addToCart,
  currentUser,
  quantity,
  setQuantity,
}) {
  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          currentUser={currentUser}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      ))}
    </div>
  );
}

export default ProductList;
