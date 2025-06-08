# Preact Shop 🛍️

Una tienda en línea moderna construida con Preact, Vite y TailwindCSS.

## 🚀 Características

- Construido con Preact para un rendimiento óptimo
- Estilizado con TailwindCSS
- Modo oscuro/claro
- Carrito de compras funcional
- Sistema de notificaciones con Snackbar
- Proceso de pago
- Diseño responsivo

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── Cart.jsx       # Componente del carrito
│   ├── Checkout.jsx   # Componente de pago
│   ├── DarkModeToggle.jsx
│   └── SnackbarProvider.jsx
├── context/           # Contextos de React
│   ├── CartContext.jsx
│   └── useDarkMode.js
├── pages/             # Páginas principales
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Home.jsx
│   └── Product.jsx
├── store/             # Manejo del estado
│   ├── cartStore.js
│   └── useSnackBar.js
└── assets/            # Recursos estáticos
```

## 🛠️ Tecnologías Utilizadas

- [Preact](https://preactjs.com/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

## 📥 Instalación

1. Clona el repositorio:
\`\`\`bash
git clone https://github.com/tu-usuario/Preact-shop.git
cd Preact-shop
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Inicia el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

## 🚀 Scripts Disponibles

- \`npm run dev\`: Inicia el servidor de desarrollo
- \`npm run build\`: Construye la aplicación para producción
- \`npm run preview\`: Previsualiza la construcción de producción

## 🤝 Cómo Contribuir

1. Fork el proyecto
2. Crea tu rama de características (\`git checkout -b feature/AmazingFeature\`)
3. Realiza tus cambios
4. Haz commit de tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
5. Push a la rama (\`git push origin feature/AmazingFeature\`)
6. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.