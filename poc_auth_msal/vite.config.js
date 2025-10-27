import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// Para funcionar com HTTPS localmente e Azure AD B2C
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    port: 7294,
    https: true,
  },
});

// Para funcionar apenas com Azure AD, apenas isto é necessário
// export default defineConfig({
//   plugins: [react()],
// })
