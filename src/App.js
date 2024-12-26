import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import Sale from "./components/Sale";
import CategoriesAll from "./components/CategoriesAll";
import SaleAll from "./components/SaleAll";
import Form from "./components/Form";
import Productscat from "./components/Productscat";
import Cart from "./components/Cart";
import Product from "./components/Product";
import { CartProvider } from "./contexts/CartContext";
import NotFound from "./components/NotFound";

class App extends React.Component {
  render() {
    return (
      <CartProvider>
        <Router>
          <div className="wrapper">
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Categories showAll={false} />
                    <Form />
                    <Sale />
                  </>
                }
              />
              <Route path="/all-categories" element={<CategoriesAll />} />
              <Route path="/all-sale" element={<SaleAll />} />
              <Route
                path="/products/:categoryId"
                element={<Productscat />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    );
  }
}

export default App;
