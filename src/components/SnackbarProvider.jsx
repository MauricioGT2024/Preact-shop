import { createContext } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";
import { motion, AnimatePresence } from "framer-motion";

export const SnackbarContext = createContext();

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success", // 'success' | 'error' | 'info' | 'warning'
  });

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        setSnackbar((s) => ({ ...s, open: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbar.open]);

  function showSnackbar(message, type = "success") {
    setSnackbar({ open: true, message, type });
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <div className="fixed bottom-5 inset-x-0 flex justify-center items-center z-50 pointer-events-none">
        <AnimatePresence>
          {snackbar.open && (
            <motion.div
              key="snackbar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`pointer-events-auto px-4 py-2 rounded-md shadow-md text-white text-sm font-medium 
                ${snackbar.type === "success" ? "bg-green-600" : ""}
                ${snackbar.type === "error" ? "bg-red-600" : ""}
                ${snackbar.type === "info" ? "bg-blue-600" : ""}
                ${snackbar.type === "warning" ? "bg-yellow-600 text-black" : ""}
              `}
            >
              {snackbar.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SnackbarContext.Provider>
  );
}
