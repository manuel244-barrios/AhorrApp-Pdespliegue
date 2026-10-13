import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; 
import fs from 'fs';

const hasLocalCertificates = fs.existsSync('certs/private.key') && fs.existsSync('certs/certificate.crt');

export default defineConfig({
  plugins: [react()], 
  server: {
    host: `localhost`,
    port: 5173,
    ...(hasLocalCertificates && {
      https: {
        key: fs.readFileSync('certs/private.key'),
        cert: fs.readFileSync('certs/certificate.crt'),
      },
    }),
    proxy: {
      "/api": {
        target: "https://ahorrapp-react-pkj9.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});