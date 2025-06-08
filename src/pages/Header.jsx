import { useContext, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { HiOutlineMenu, HiX } from 'react-icons/hi'; // Heroicons Outline
import { AnimatePresence, motion } from 'framer-motion';
import { CiShoppingCart } from 'react-icons/ci';
import { FaMoon, FaSun } from 'react-icons/fa';
import { HiBars3 } from 'react-icons/hi2';
import { HiXMark } from 'react-icons/hi2';
import { useDarkMode } from '../DarkMode/useDarkMode.js';
import { CartContext } from '../context/CartContext.jsx';

export default function Header({ toggleCart }) {
	const { cartItems } = useContext(CartContext); // si aún usás Context, cambialo aquí
	const [drawerOpen, setDrawerOpen] = useState(false);
	const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const [isDark, setIsDark] = useDarkMode();

	const toggleDark = () => {
		const html = document.documentElement;
		html.classList.toggle('dark');
		setIsDark(html.classList.contains('dark'));
	};

  return (
    <header className='bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-900 dark:to-gray-800 text-white sticky top-0 z-50 shadow-lg'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-6 py-4'>
        <h1
          className='text-2xl font-bold tracking-wide cursor-pointer hover:scale-105 transition-transform'
          onClick={() => route('/')}
        >
          🛍️ MiTienda
        </h1>

        {/* Desktop navigation */}
        <nav className='hidden md:flex items-center space-x-6'>
          <button
            onClick={() => route('/')}
            className='hover:text-blue-200 transition-colors'
          >
            Inicio
          </button>
          <button
            onClick={() => route('/checkout')}
            className='hover:text-blue-200 transition-colors'
          >
            Checkout
          </button>

          <button onClick={toggleCart} className='relative text-white hover:text-blue-200 transition-colors'>
            <CiShoppingCart className='w-6 h-6' />
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold'
              >
                {count}
              </motion.span>
            )}
          </button>

          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            onClick={toggleDark}
            className='hover:text-blue-200'
          >
            {isDark ? <FaSun className='w-6 h-6' /> : <FaMoon className='w-6 h-6' />}
          </motion.button>
        </nav>

        {/* Mobile menu button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setDrawerOpen(!drawerOpen)}
          className='text-white focus:outline-none md:hidden'
          aria-label='Abrir menú'
        >
          {drawerOpen ? (
            <HiXMark className='w-7 h-7' />
          ) : (
            <HiBars3 className='w-7 h-7' />
          )}
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black z-40'
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className='fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl z-50 p-6'
            >
              <div className='flex flex-col h-full'>
                <button
                  className='self-end text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
                  onClick={() => setDrawerOpen(false)}
                >
                  <HiXMark className='w-7 h-7' />
                </button>
                <nav className='flex flex-col gap-6 mt-8 text-gray-800 dark:text-gray-200'>
                  <a
                    href='/'
                    onClick={() => setDrawerOpen(false)}
                    className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                  >
                    Inicio
                  </a>
                  <a
                    href='/checkout'
                    onClick={() => setDrawerOpen(false)}
                    className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                  >
                    Checkout
                  </a>
                  <a
                    href='#'
                    onClick={() => {
                      toggleCart();
                      setDrawerOpen(false);
                    }}
                    className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                  >
                    Carrito
                  </a>
                  <button
                    onClick={() => {
                      toggleDark();
                      setDrawerOpen(false);
                    }}
                    className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                  >
                    {isDark ? 'Modo claro' : 'Modo oscuro'}
                  </button>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
