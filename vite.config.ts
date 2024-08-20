import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

console.log('dirname', __dirname);
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@headless': path.resolve(__dirname, './src/headless'),
            '@features': path.resolve(__dirname, './src/features'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
});
