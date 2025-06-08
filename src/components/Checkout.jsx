// src/pages/Checkout.jsx
import { useContext, useState } from "preact/hooks";
import { CartContext } from "../context/CartContext.jsx";
import { route } from "preact-router";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleCheckout() {
    // Aquí podrías agregar validaciones, simulación de pago, etc.
    setOrderPlaced(true);
    clearCart();
  }

  if (orderPlaced)
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          ¡Gracias por tu compra! 🎉
        </h2>
        <p className="mb-4">Tu pedido ha sido procesado correctamente.</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => route("/")}
        >
          Volver a la tienda
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          Tu carrito está vacío.
        </p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-contain"
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold">
              Total: ${total.toFixed(2)}
            </span>
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}
