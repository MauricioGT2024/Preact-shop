import { useState, useEffect, useContext } from "preact/hooks";
import { CartContext } from "../context/CartContext.jsx";
import { useSnackbar } from "../store/useSnackBar.js";

export default function Product({ id }) {
  const [productState, setProductState] = useState({
    data: null,
    loading: true,
    error: null,
  });
  const { addToCart } = useContext(CartContext);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProductState({ data, loading: false, error: null });
      } catch (error) {
        setProductState((prev) => ({ ...prev, loading: false, error }));
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (productState.data) {
      addToCart(productState.data);
      showSnackbar("Producto agregado al carrito ✅");
    }
  };

  if (productState.loading) {
    return (
      <div role="status" className="text-center text-gray-500 dark:text-gray-400">
        Cargando...
      </div>
    );
  }

  if (productState.error) {
    return (
      <div role="alert" className="text-center text-red-500 mt-8">
        Error al cargar el producto: {productState.error.message}
      </div>
    );
  }

  const { data: product } = productState;

  return (
    <section className="max-w-4xl mx-auto p-6">
      <article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/2 bg-gray-100 dark:bg-gray-700 flex justify-center items-center p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 object-contain"
            loading="lazy"
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {product.description}
            </p>
            <p className="text-sm text-gray-400 capitalize mb-4">
              Categoría: {product.category}
            </p>
            <span className="text-3xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg transition-colors duration-200"
            aria-label="Añadir al carrito"
          >
            Añadir al carrito
          </button>
        </div>
      </article>
    </section>
  );
}
