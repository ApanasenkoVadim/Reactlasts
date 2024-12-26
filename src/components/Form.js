import React, { useState } from "react";
import "../style/form.css";
import "../index.css";
import HandsImage from '../img/off.svg';

const DiscountForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="discount-section">
      <figure className="discount-image">
        <img src={HandsImage} alt="Hands with plants" />
      </figure>

      <article className="discount-content">
        <h1 className="discount-title">5% off on the first order</h1>
        <form className="discount-form" onSubmit={handleFormSubmit}>
          {["Name", "Phone number", "Email"].map((placeholder, index) => (
            <div className="input-group" key={index}>
              <input
                type={placeholder === "Email" ? "email" : "text"}
                placeholder={placeholder}
                className="discount-input"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className={`discount-button ${isSubmitted ? "submitted" : ""}`}
            disabled={isSubmitted}
          >
            {isSubmitted ? "Request Submitted" : "Get a discount"}
          </button>
        </form>
      </article>
    </section>
  );
};

export default DiscountForm;