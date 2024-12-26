import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../style/cart.css';

const Card = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (event) => {
    event.preventDefault();
    navigate(`/product/${product.id}`);
  };

  const handleAddProductToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
  };

  const getDiscountPercentage = (price, discountPrice) => {
    if (discountPrice) {
      const discount = Math.round(((price - discountPrice) / price) * 100);
      return `-${discount}%`;
    }
    return null;
  };

  return (
    <div className="cardproduct" onClick={handleProductClick}>
      {product.discont_price && (
        <div className="tag">
          {getDiscountPercentage(product.price, product.discont_price)}
        </div>
      )}
      <div className="card-overlay">
        <button className="add-to-cart-btn" onClick={handleAddProductToCart}>
          Add to cart
        </button>
      </div>
      <img
        src={`http://localhost:3333/public${product.image}`}
        alt={product.title}
        className="productimage"
      />
      <div className="info">
        <h3 className="titleproduct">{product.title}</h3>
        <div className="pricing">
          <span className="price">
            ${product.discont_price || product.price}
          </span>
          {product.discont_price && (
            <span className="old-price">${product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
