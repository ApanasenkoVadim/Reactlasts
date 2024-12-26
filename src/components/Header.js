import React from "react";
import '../style/header.css';
import { useLocation, useNavigate } from "react-router-dom"; 
import basket from '../img/basket.svg';
import Filter from "./Filter";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigation = (path) => navigate(path);

  const renderCartIndicator = () => (
    totalItems > 0 && (
      <div
        style={{
          position: "absolute",
          top: "-5px",
          left: "-5px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "green",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {totalItems}
      </div>
    )
  );

  const renderFilter = () => (
    location.pathname === "/all-products" && (
      <div className="product-filter-wrapper">
        <Filter />
      </div>
    )
  );

  const renderPresentation = () => (
    location.pathname === "/" && (
      <div className="presentation">
        <button className="check-out-btn">Check out</button>
      </div>
    )
  );

  return (
    <header>
      <div>
        <img
          className="logo"
          src="/logo.svg"
          alt="Logo"
          style={{ width: "70px", height: "70px", cursor: "pointer" }}
          onClick={() => handleNavigation("/")}
        />
        <ul className="nav">
          <li onClick={() => handleNavigation("/")} style={{ cursor: "pointer" }}>Main Page</li>
          <li onClick={() => handleNavigation("all-categories")}>Categories</li>
          <li onClick={() => handleNavigation("all-products")}>All products</li>
          <li onClick={() => handleNavigation("all-sale")}>All sales</li>
        </ul>
        <div style={{ position: "relative", marginRight: "40px" }}>
          <img
            src={basket}
            alt="basket"
            style={{ width: "44px", height: "48px", cursor: "pointer" }}
            className="shop-cart-button"
            onClick={() => handleNavigation("/cart")}
          />
          {renderCartIndicator()}
        </div>
      </div>
      {renderFilter()}
      {renderPresentation()}
    </header>
  );
};

export default Header;
