import { useState, useEffect } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const filtered =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      {/* Categorías */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          }`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`capitalize px-4 py-2 rounded-full text-sm ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cargando */}
      {loading && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Cargando productos...
        </p>
      )}

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition bg-white dark:bg-gray-800 p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mb-4"
            />
            <h2 className="font-semibold text-md mb-2 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-green-600 font-bold mt-auto">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
