import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const IndividualProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/products/${id}`, { withCredentials: true })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {product && (
        <div className="product-show">
          <h2>Product Information</h2>
          <p>Name: {product.name}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <img src={product.image} alt={product.name} />
          <button onClick={() => navigate("/shop")}>Go back</button>
        </div>
      )}
    </div>
  );
};

export default IndividualProductPage;
