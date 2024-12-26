import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../style/cart.css";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const [showOverlay, setShowOverlay] = useState(false);

    const calculateTotalItems = () =>
        cart.reduce((sum, item) => sum + item.quantity, 0);

    const calculateTotalPrice = () =>
        cart.reduce((sum, item) => sum + (item.discont_price || item.price) * item.quantity, 0);

    const updateItemQuantity = (itemId, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(itemId, newQuantity);
        } else {
            removeFromCart(itemId);
        }
    };

    const confirmOrder = (e) => {
        e.preventDefault();
        clearCart();
        setShowOverlay(true);
    };

    const closeOverlay = () => setShowOverlay(false);

    return (
        <div className="cart-container">
            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <button onClick={closeOverlay} className="close-button">
                            &times;
                        </button>
                        <h2>Order Confirmed!</h2>
                        <p>Your order has been placed successfully.</p>
                        <p>Our manager will contact you shortly for confirmation.</p>
                    </div>
                </div>
            )}

            <header className="cart-header">
                <h1>Shopping Cart</h1>
            </header>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Looks like you have no items in your basket currently.</p>
                    <button
                        onClick={() => navigate("/all-products")}
                        className="shoppingbutton"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={`http://localhost:3333/public${item.image}`}
                                    alt={item.title}
                                    className="cartitemimage"
                                />
                                <div className="cartiteminfo">
                                    <h3>{item.title}</h3>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                                            +
                                        </button>
                                    </div>
                                    <p className="price">
                                        ${item.discont_price || item.price}
                                        {item.discont_price && <span className="old-price">${item.price}</span>}
                                    </p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="removebutton">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <p>{calculateTotalItems()} items</p>
                        <p className="total">
                            Total: <span>${calculateTotalPrice().toFixed(2)}</span>
                        </p>
                        <form onSubmit={confirmOrder}>
                            <input type="text" placeholder="Name" required />
                            <input type="tel" placeholder="Phone Number" required />
                            <input type="email" placeholder="Email" required />
                            <button type="submit" className="order-button">
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
