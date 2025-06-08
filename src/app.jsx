import { Router } from "preact-router";
import Home from "./pages/Home.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Header from "./pages/Header.jsx";
import { useState } from "preact/hooks";
import Footer from "./pages/Footer.jsx";
import ProductCard from "./pages/Product.jsx";

export function App() {
  const [cartVisible, setCartVisible] = useState(false);
  const toggleCart = () => setCartVisible((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header toggleCart={toggleCart} />
      <Cart visible={cartVisible} />

      {/* Contenido principal crece si es necesario */}
      <main className="flex-1">
        <Router>
          <Home path="/" />
          <ProductCard path="/product/:id" />
          <Checkout path="/checkout" />
        </Router>
      </main>

      <Footer />
    </div>
  );
}
