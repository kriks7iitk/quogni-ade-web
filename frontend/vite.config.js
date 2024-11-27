import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../.env');
const env = dotenv.config({ path: envPath }).parsed;

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: env.VITE_CLIENT_HOST,
      port: parseInt(env.VITE_CLIENT_PORT, 10) || 3000,
      open: true,
    },
    envDir: path.resolve(__dirname, '../'),
  };
});
