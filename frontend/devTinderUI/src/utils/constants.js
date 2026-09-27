export const BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "http://localhost:3000");
