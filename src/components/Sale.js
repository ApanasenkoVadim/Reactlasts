import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import "../style/sale.css";
import "../index.css";

const Sale = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3333/products/all");
        const saleItems = response.data.filter(
          (product) => product.discont_price && product.discont_price < product.price
        );
        setSaleProducts(saleItems.slice(0, 4));
      } catch (error) {
        console.error("Failed to load sale products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const calculateDiscountPercentage = (price, discountPrice) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containersale">
      <header className="sale-header">
        <h1 className="sale-title">Sale</h1>
        <div className="sale-line"></div>
        <button className="all-sale-button" onClick={() => navigate("/all-sale")}>
          All Sale
        </button>
      </header>

      <div className="salegrid">
        {saleProducts.map((product) => (
          <div
            key={product.id}
            className="cardproduct"
            onClick={() => handleProductClick(product.id)}
          >
            {product.discont_price && (
              <div className="tag">
                -{calculateDiscountPercentage(product.price, product.discont_price)}%
              </div>
            )}

            <img
              src={`http://localhost:3333/public${product.image}`}
              alt={product.title}
              className="productimage"
            />

            <div className="info">
              <h3 className="titleproduct">{product.title}</h3>
              <div className="pricing">
                <span className="price">${product.discont_price || product.price}</span>
                {product.discont_price && (
                  <span className="old-price">${product.price}</span>
                )}
              </div>
              <div className="card-overlay">
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sale;