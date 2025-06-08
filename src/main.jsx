import { render } from "preact";
import { CartProvider } from "./context/CartContext.jsx";
import "./index.css";
import { App } from "./app.jsx";
import { SnackbarProvider } from "./components/SnackbarProvider.jsx";

render(
  <CartProvider>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </CartProvider>,
  document.getElementById("app")
);
