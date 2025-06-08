import { useContext, useState } from "preact/hooks";
import { route } from "preact-router";

import { CiShoppingCart } from "react-icons/ci";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiBars3 } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import { useDarkMode } from "../context/useDarkMode.js";
import { CartContext } from "../context/CartContext.jsx";

export default function Header({ toggleCart }) {
  const { cartItems } = useContext(CartContext); // si aún usás Context, cambialo aquí
  const [drawerOpen, setDrawerOpen] = useState(false);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isDark, setIsDark] = useDarkMode();

  const toggleDark = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDark(html.classList.contains("dark"));
  };

  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <h1
          className="text-xl font-bold tracking-wide cursor-pointer"
          onClick={() => route("/")}
        >
          🛍️ MiTienda
        </h1>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <button
            onClick={() => route("/")}
            className="hover:underline transition"
          >
            Inicio
          </button>
          <button
            onClick={() => route("/checkout")}
            className="hover:underline transition"
          >
            Checkout
          </button>

          <button onClick={toggleCart} className="relative text-white">
            <CiShoppingCart className="w-6 h-6" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {count}
              </span>
            )}
          </button>

          <button onClick={toggleDark}>
            {isDark ? (
              <FaSun className="w-6 h-6" />
            ) : (
              <FaMoon className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setDrawerOpen(true)}>
          <HiBars3 className="w-6 h-6" />
        </button>
      </div>

      {/* Drawer para móvil */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 text-black dark:text-white p-4 z-50 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Menú</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <HiXMark className="w-6 h-6" />
              </button>
            </div>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => {
                    route("/");
                    setDrawerOpen(false);
                  }}
                  className="w-full text-left hover:underline"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    route("/checkout");
                    setDrawerOpen(false);
                  }}
                  className="w-full text-left hover:underline"
                >
                  Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    toggleCart();
                    setDrawerOpen(false);
                  }}
                  className="w-full text-left hover:underline"
                >
                  Carrito
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    toggleDark();
                    setDrawerOpen(false);
                  }}
                  className="w-full text-left hover:underline"
                >
                  {isDark ? "Modo claro" : "Modo oscuro"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
