import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    // A configuração de servidor específica foi removida,
    // pois a Vercel e o Vite (em produção) gerenciam isso automaticamente.
    // Deixar sem essa configuração garante portabilidade.

    plugins: [
      react(),
      isDevelopment && componentTagger(),
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});