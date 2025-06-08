import { useState, useEffect, useContext } from "preact/hooks";
import { CartContext } from "../context/CartContext.jsx";
import { useSnackbar } from "../store/useSnackBar.js";

export default function Product({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAdd = () => {
    if (product) {
      addToCart(product);
      showSnackbar("Producto agregado al carrito ✅");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Cargando...
      </p>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-8">
        Error al cargar el producto: {error.message}
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto p-6">
      <article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/2 bg-gray-100 dark:bg-gray-700 flex justify-center items-center p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 object-contain"
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
            onClick={handleAdd}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg transition"
          >
            Añadir al carrito
          </button>
        </div>
      </article>
    </section>
  );
}
