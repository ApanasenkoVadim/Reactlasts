import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../style/filter.css";
import "../index.css";
import Card from "./Card";

const Filter = () => {
  const [state, setState] = useState({
    products: [],
    filteredProducts: [],
    priceFrom: "",
    priceTo: "",
    discountOnly: false,
    sortOrder: "default",
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3333/products/all");
      setState((prevState) => ({
        ...prevState,
        products: response.data,
        filteredProducts: response.data,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const applyFilters = useCallback(() => {
    const { products, priceFrom, priceTo, discountOnly, sortOrder } = state;
    let filtered = [...products];

    if (priceFrom) {
      filtered = filtered.filter((product) => product.price >= priceFrom);
    }

    if (priceTo) {
      filtered = filtered.filter((product) => product.price <= priceTo);
    }

    if (discountOnly) {
      filtered = filtered.filter(
        (product) => product.discont_price && product.discont_price < product.price
      );
    }

    if (sortOrder === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setState((prevState) => ({
      ...prevState,
      filteredProducts: filtered,
    }));
  }, [state]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleInputChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div className="filtercontainer">
      <div className="filterheader">
        <h1 className="filtertitle">All Products</h1>
      </div>

      <div className="filterpanel">
        <div className="filterprice">
          <span>Price</span>
          <input
            type="number"
            placeholder="from"
            value={state.priceFrom}
            onChange={(e) => handleInputChange("priceFrom", e.target.value)}
          />
          <input
            type="number"
            placeholder="to"
            value={state.priceTo}
            onChange={(e) => handleInputChange("priceTo", e.target.value)}
          />
        </div>

        <div className="filterdiscount">
          <label>
            Discounted items
            <input
              type="checkbox"
              checked={state.discountOnly}
              onChange={() =>
                handleInputChange("discountOnly", !state.discountOnly)
              }
            />
          </label>
        </div>

        <div className="filtersort">
          <label htmlFor="sortselect">Sorted</label>
          <select
            id="sort-select"
            value={state.sortOrder}
            onChange={(e) => handleInputChange("sortOrder", e.target.value)}
          >
            <option value="default">by default</option>
            <option value="price-low">price: low-high</option>
            <option value="price-high">price: high-low</option>
          </select>
        </div>
      </div>

      <div className="containersale">
        <div className="salegrid">
          {state.filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
