import { useContext } from "preact/hooks";
import { CartContext } from "../context/CartContext";
import { route } from "preact-router";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart({ visible }) {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.aside
        key="cart"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="fixed top-20 right-4 w-80 max-h-[80vh] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-2xl z-50 flex flex-col"
      >
        <div className="p-4 overflow-y-auto flex-1">
          <h2 className="text-xl font-bold mb-4">🛒 Tu carrito</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              El carrito está vacío.
            </p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-start bg-gray-100 dark:bg-gray-800 p-2 rounded"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      x{item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <p className="font-semibold mb-3">
              Total: <span className="text-green-600">${total.toFixed(2)}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-1.5 rounded"
              >
                Vaciar
              </button>
              <button
                onClick={() => route("/checkout")}
                className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded"
              >
                Hacer compra
              </button>
            </div>
          </div>
        )}
      </motion.aside>
    </AnimatePresence>
  );
}
