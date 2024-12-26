import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/categories.css";
import Card from "./Card";

const CATEGORY_NAMES = {
  1: "Annuals",
  2: "Nursery",
  3: "Garden Art",
  4: "Plant Care",
  5: "Seasonal",
};

const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryTitle = CATEGORY_NAMES[categoryId] || "Unknown category";

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/products/category/${categoryId}`,
          { signal: controller.signal }
        );
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching products:", err.response || err);
          setError("Failed to load products.");
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [categoryId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="containersale">
      <h1 className="category-title">{categoryTitle}</h1>
      <div className="salegrid">
        {products.length > 0 ? (
          products.map((product) => <Card key={product.id} product={product} />)
        ) : (
          <div>No products found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;
