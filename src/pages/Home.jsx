import { useState, useEffect } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Separar la lógica de fetching en funciones async/await
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filtered = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const CategoryButton = ({ category, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm transition-colors
        ${isSelected 
          ? "bg-blue-600 text-white"
          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
        }
      `}
    >
      {category === "all" ? "Todos" : category}
    </button>
  );

  const ProductCard = ({ product }) => (
    <Link
      href={`/product/${product.id}`}
      className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm 
                hover:shadow-lg transition bg-white dark:bg-gray-800 p-4 
                flex flex-col group"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-4 group-hover:scale-105 transition-transform"
        loading="lazy"
      />
      <h2 className="font-semibold text-md mb-2 line-clamp-2">
        {product.title}
      </h2>
      <p className="text-green-600 font-bold mt-auto">
        ${product.price.toFixed(2)}
      </p>
    </Link>
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      <div className="mb-6 flex flex-wrap gap-3">
        <CategoryButton 
          category="all"
          isSelected={selectedCategory === "all"}
          onClick={() => setSelectedCategory("all")}
        />
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            category={cat}
            isSelected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          />
        ))}
      </div>

      {loading && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Cargando productos...
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
