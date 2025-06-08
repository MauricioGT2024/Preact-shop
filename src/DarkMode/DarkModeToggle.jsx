import { useState, useEffect } from "preact/hooks";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  function toggle() {
    document.documentElement.classList.toggle("dark");
    setDark(document.documentElement.classList.contains("dark"));
  }

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded"
      aria-label="Toggle Dark Mode"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
