import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import basicSsl from "@vitejs/plugin-basic-ssl";

// Para funcionar com HTTPS e com porta diferente
// export default defineConfig({
//   plugins: [react(), basicSsl()],
//   server: {
//     port: 7294,
//     https: true,
//   },
// });

// Para funcionar apenas com http
export default defineConfig({
  plugins: [react()],
});
